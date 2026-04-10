const defaultEvents = [
  {
    title: 'Git/Github',
    description: 'A hands-on workshop on Git and GitHub covering repositories, commits, branching, merging, and collaboration basics for students.',
    date: new Date('2026-01-15T10:00:00+05:30'),
    status: 'past',
    totalRegistrations: 55,
    maxRegistrations: 50,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb'
  },
  {
    title: 'Supabase',
    description: 'An introductory session on Supabase where students learned authentication, database integration, and backend services for modern web applications.',
    date: new Date('2026-02-10T11:00:00+05:30'),
    status: 'past',
    totalRegistrations: 72,
    maxRegistrations: 50,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'
  },
  {
    title: 'Web Development Bootcamp',
    description: 'A practical bootcamp for students to learn HTML, CSS, JavaScript, React, and basic backend development through mini projects.',
    date: new Date('2026-04-25T09:30:00+05:30'),
    status: 'upcoming',
    totalRegistrations: 0,
    maxRegistrations: 50,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
  }
];

module.exports = defaultEvents;
