// Outlook integration via Replit connector
import { Client } from '@microsoft/microsoft-graph-client';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X-Replit-Token not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=outlook',
    {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Outlook not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
export async function getUncachableOutlookClient() {
  const accessToken = await getAccessToken();

  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => accessToken
    }
  });
}

export async function getBookingsCalendarEvents() {
  const client = await getUncachableOutlookClient();

  const now = new Date();
  const threeMonthsAgo = new Date(now);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const sixMonthsFromNow = new Date(now);
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

  const events = await client
    .api('/me/calendarView')
    .query({
      startDateTime: threeMonthsAgo.toISOString(),
      endDateTime: sixMonthsFromNow.toISOString(),
      $orderby: 'start/dateTime desc',
      $top: 100,
      $select: 'id,subject,start,end,location,onlineMeeting,onlineMeetingUrl,bodyPreview,organizer,attendees,isOnlineMeeting,webLink'
    })
    .get();

  return (events.value || []).map((event: any) => ({
    id: event.id,
    title: event.subject || 'Untitled',
    startDateTime: event.start?.dateTime,
    startTimeZone: event.start?.timeZone,
    endDateTime: event.end?.dateTime,
    endTimeZone: event.end?.timeZone,
    location: event.location?.displayName || '',
    meetingLink: event.onlineMeeting?.joinUrl || event.onlineMeetingUrl || '',
    isOnline: event.isOnlineMeeting || false,
    bodyPreview: event.bodyPreview || '',
    organizer: event.organizer?.emailAddress?.name || '',
    attendees: (event.attendees || []).map((a: any) => ({
      name: a.emailAddress?.name || '',
      email: a.emailAddress?.address || '',
      status: a.status?.response || 'none',
    })),
    webLink: event.webLink || '',
  }));
}
