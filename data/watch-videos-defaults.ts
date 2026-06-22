export type WatchVideoSeed = { id: string; title: string; desc: string; duration: string; youtubeId: string; comingSoon: boolean };

export const WATCH_VIDEOS_DEFAULTS: Record<string, WatchVideoSeed[]> = {
  faithdesk: [
    { id:"fd-1", title:"FaithDesk Overview", desc:"A complete walkthrough -- members, tithes, events and more.", duration:"12 min", youtubeId:"", comingSoon:true },
    { id:"fd-2", title:"Managing Church Members", desc:"Add, organise and search your congregation.", duration:"8 min", youtubeId:"", comingSoon:true },
    { id:"fd-3", title:"Recording Tithes & Offerings", desc:"Track every contribution with automatic receipts.", duration:"6 min", youtubeId:"", comingSoon:true },
    { id:"fd-4", title:"Planning Events", desc:"Create events, track attendance, send reminders.", duration:"7 min", youtubeId:"", comingSoon:true },
    { id:"fd-5", title:"SMS & Announcements", desc:"Broadcast to members or specific groups.", duration:"5 min", youtubeId:"", comingSoon:true },
    { id:"fd-6", title:"Reports & Analytics", desc:"Monthly giving, attendance charts, all exportable.", duration:"6 min", youtubeId:"", comingSoon:true },
  ],
  detaildesk: [
    { id:"dd-1", title:"DetailDesk Overview", desc:"Bookings, job cards, clients and invoices walkthrough.", duration:"10 min", youtubeId:"", comingSoon:true },
    { id:"dd-2", title:"Taking & Managing Bookings", desc:"Online bookings, walk-ins and calendar scheduling.", duration:"8 min", youtubeId:"", comingSoon:true },
    { id:"dd-3", title:"Job Cards & Service Tracking", desc:"Create job cards, track progress, mark complete.", duration:"7 min", youtubeId:"", comingSoon:true },
    { id:"dd-4", title:"Creating & Sending Invoices", desc:"Professional invoices with payment tracking.", duration:"5 min", youtubeId:"", comingSoon:true },
    { id:"dd-5", title:"Client Management", desc:"Full client history, vehicles, preferences.", duration:"6 min", youtubeId:"", comingSoon:true },
    { id:"dd-6", title:"Reports & Revenue", desc:"Monthly revenue, popular services, team performance.", duration:"5 min", youtubeId:"", comingSoon:true },
  ],
  schooldesk: [
    { id:"sd-1", title:"SchoolDesk Overview", desc:"Fees, students, results and the parent portal in one walkthrough.", duration:"10 min", youtubeId:"", comingSoon:true },
    { id:"sd-2", title:"Collecting Fees Online", desc:"Set fee structures, send invoices, reconcile Paystack payments.", duration:"8 min", youtubeId:"", comingSoon:true },
    { id:"sd-3", title:"Recording Results", desc:"Enter scores and auto-generate report cards per term.", duration:"7 min", youtubeId:"", comingSoon:true },
    { id:"sd-4", title:"The Parent Portal", desc:"What parents see — results, fees, announcements.", duration:"6 min", youtubeId:"", comingSoon:true },
    { id:"sd-5", title:"Managing Staff & Classes", desc:"Teacher accounts, class assignments, access levels.", duration:"6 min", youtubeId:"", comingSoon:true },
    { id:"sd-6", title:"Your School Website", desc:"Set up the free public website that comes with SchoolDesk.", duration:"5 min", youtubeId:"", comingSoon:true },
  ],
};
