import { getUncachableOutlookClient } from './outlook';

let siteId: string | null = null;

async function getSiteId(): Promise<string> {
  if (siteId) return siteId;
  const client = await getUncachableOutlookClient();
  const site = await client.api('/me/drive/root').select('parentReference').get();
  const rootSite = await client.api('/sites/root').select('id').get();
  siteId = rootSite.id;
  return siteId;
}

async function findOrCreateList(listName: string, columns: { name: string; type: string; description?: string }[]): Promise<string> {
  const client = await getUncachableOutlookClient();
  const site = await getSiteId();

  try {
    const existing = await client.api(`/sites/${site}/lists`).filter(`displayName eq '${listName}'`).get();
    if (existing.value && existing.value.length > 0) {
      return existing.value[0].id;
    }
  } catch {}

  const listDef: any = {
    displayName: listName,
    list: { template: 'genericList' },
    columns: columns.map(col => {
      if (col.type === 'text') {
        return { name: col.name, text: { maxLength: 255 }, description: col.description || '' };
      } else if (col.type === 'multiline') {
        return { name: col.name, text: { allowMultipleLines: true, maxLength: 0 }, description: col.description || '' };
      } else if (col.type === 'dateTime') {
        return { name: col.name, dateTime: { format: 'dateOnly' }, description: col.description || '' };
      }
      return { name: col.name, text: { maxLength: 255 } };
    }),
  };

  const created = await client.api(`/sites/${site}/lists`).post(listDef);
  console.log(`SharePoint list created: ${listName} (${created.id})`);
  return created.id;
}

async function addListItem(listId: string, fields: Record<string, string>) {
  const client = await getUncachableOutlookClient();
  const site = await getSiteId();
  await client.api(`/sites/${site}/lists/${listId}/items`).post({ fields });
}

const listIds: Record<string, string | null> = {
  contacts: null,
  jobApplications: null,
  grantApplications: null,
};

export async function forwardContactToList(data: { name: string; email: string; message: string }) {
  try {
    if (!listIds.contacts) {
      listIds.contacts = await findOrCreateList('Website Contact Submissions', [
        { name: 'SubmitterName', type: 'text', description: 'Name of the person' },
        { name: 'Email', type: 'text', description: 'Email address' },
        { name: 'Message', type: 'multiline', description: 'Message content' },
        { name: 'SubmittedDate', type: 'text', description: 'Date submitted' },
      ]);
    }

    await addListItem(listIds.contacts, {
      Title: `Contact: ${data.name}`,
      SubmitterName: data.name,
      Email: data.email,
      Message: data.message.substring(0, 5000),
      SubmittedDate: new Date().toISOString().split('T')[0],
    });

    console.log(`Contact submission forwarded to SharePoint list: ${data.name}`);
  } catch (error: any) {
    console.error('Failed to forward contact to SharePoint list:', error?.message || error);
  }
}

export async function forwardJobApplicationToList(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  linkedIn?: string;
  coverLetter?: string;
  resumeFilename: string;
}) {
  try {
    if (!listIds.jobApplications) {
      listIds.jobApplications = await findOrCreateList('Job Applications', [
        { name: 'ApplicantName', type: 'text', description: 'Full name' },
        { name: 'Email', type: 'text', description: 'Email address' },
        { name: 'Phone', type: 'text', description: 'Phone number' },
        { name: 'Position', type: 'text', description: 'Position applied for' },
        { name: 'LinkedIn', type: 'text', description: 'LinkedIn profile URL' },
        { name: 'CoverLetter', type: 'multiline', description: 'Cover letter text' },
        { name: 'ResumeFile', type: 'text', description: 'Resume filename' },
        { name: 'SubmittedDate', type: 'text', description: 'Date submitted' },
      ]);
    }

    await addListItem(listIds.jobApplications, {
      Title: `${data.firstName} ${data.lastName} — ${data.position}`,
      ApplicantName: `${data.firstName} ${data.lastName}`,
      Email: data.email,
      Phone: data.phone,
      Position: data.position,
      LinkedIn: data.linkedIn || '',
      CoverLetter: (data.coverLetter || '').substring(0, 5000),
      ResumeFile: data.resumeFilename,
      SubmittedDate: new Date().toISOString().split('T')[0],
    });

    console.log(`Job application forwarded to SharePoint list: ${data.firstName} ${data.lastName}`);
  } catch (error: any) {
    console.error('Failed to forward job application to SharePoint list:', error?.message || error);
  }
}

export async function forwardGrantApplicationToList(data: {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  province: string;
  occupation: string;
  companyOrOrg: string;
  industry: string;
  yearsExperience: string;
  focusArea: string;
  goals: string;
  challenges: string;
  hopeToAchieve: string;
}) {
  try {
    if (!listIds.grantApplications) {
      listIds.grantApplications = await findOrCreateList('Grant Applications', [
        { name: 'ApplicantName', type: 'text', description: 'Full name' },
        { name: 'Email', type: 'text', description: 'Email address' },
        { name: 'Phone', type: 'text', description: 'Phone number' },
        { name: 'Location', type: 'text', description: 'City and Province' },
        { name: 'Occupation', type: 'text', description: 'Occupation or title' },
        { name: 'Company', type: 'text', description: 'Company or organization' },
        { name: 'Industry', type: 'text', description: 'Industry' },
        { name: 'Experience', type: 'text', description: 'Years of experience' },
        { name: 'FocusArea', type: 'text', description: 'Primary focus area' },
        { name: 'Goals', type: 'multiline', description: 'Goals described' },
        { name: 'Challenges', type: 'multiline', description: 'Challenges described' },
        { name: 'HopedOutcomes', type: 'multiline', description: 'What they hope to achieve' },
        { name: 'SubmittedDate', type: 'text', description: 'Date submitted' },
      ]);
    }

    await addListItem(listIds.grantApplications, {
      Title: `Grant: ${data.fullName}`,
      ApplicantName: data.fullName,
      Email: data.email,
      Phone: data.phone,
      Location: `${data.city}, ${data.province}`,
      Occupation: data.occupation,
      Company: data.companyOrOrg,
      Industry: data.industry,
      Experience: data.yearsExperience,
      FocusArea: data.focusArea,
      Goals: data.goals.substring(0, 5000),
      Challenges: data.challenges.substring(0, 5000),
      HopedOutcomes: data.hopeToAchieve.substring(0, 5000),
      SubmittedDate: new Date().toISOString().split('T')[0],
    });

    console.log(`Grant application forwarded to SharePoint list: ${data.fullName}`);
  } catch (error: any) {
    console.error('Failed to forward grant application to SharePoint list:', error?.message || error);
  }
}
