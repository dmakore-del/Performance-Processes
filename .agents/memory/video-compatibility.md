---
name: Browser video compatibility
description: Cross-browser media verification and misleading blank video captures.
---

Supply WebM alongside MP4 for public video and check the rendered result, not just file metadata or a successful HTTP response.

**Why:** A valid H.264 file served successfully but rendered blank in the capture browser. Adding a VP9 WebM source made the footage visible. Reduced-motion settings were initially suspected without evidence.

**How to apply:** When video is blank, distinguish playback preferences, network delivery, and codec support before changing accessibility behavior. Do not assume a clean console or a valid file proves playback.

For responsive video layouts, constrain media by width and aspect ratio (`w-full min-w-0`) rather than adding a fixed minimum height at phone widths.

**Why:** A minimum height on the hero video wrapper caused horizontal overflow on mobile; removing it preserved the aspect ratio and fit the viewport.

**How to apply:** Keep the wrapper's intrinsic aspect ratio and `min-w-0` when the media sits in a responsive grid or flex layout.
