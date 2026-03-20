export type ResourceCollectionKey = 'poetry' | 'books' | 'names' | 'media'

export interface ResourceCollectionMeta {
  key: ResourceCollectionKey
  title: string
  titlePashto: string
  description: string
}

export interface ResourceEntry {
  id: string
  collection: ResourceCollectionKey
  title: string
  titlePashto?: string
  subtitle?: string
  summary: string
  body?: string
  tags: string[]
  region?: string
  contributor?: string
  verificationStatus: 'curated' | 'community-approved'
}

export const resourceCollections: ResourceCollectionMeta[] = [
  {
    key: 'poetry',
    title: 'Poetry & Oral Tradition',
    titlePashto: 'شاعري او شفاهي دود',
    description: 'Classical poetry, folk verse, and oral forms that keep Pashto feeling alive across generations.',
  },
  {
    key: 'books',
    title: 'Books & Reading Paths',
    titlePashto: 'کتابونه او د لوست لارې',
    description: 'Learner reading shelves, story routes, and book-oriented pathways for families and readers.',
  },
  {
    key: 'names',
    title: 'Names & Meanings',
    titlePashto: 'نومونه او ماناوې',
    description: 'Pashto names, meanings, and notes tied to identity, poetry, memory, and family life.',
  },
  {
    key: 'media',
    title: 'Media & Diaspora',
    titlePashto: 'رسنۍ او کډوالي',
    description: 'Journalism, radio, public conversation, and diaspora references that carry Pashto into daily life.',
  },
]

export const seededResourceEntries: Record<ResourceCollectionKey, ResourceEntry[]> = {
  poetry: [
    {
      id: 'poetry-rahman-baba',
      collection: 'poetry',
      title: 'Rahman Baba',
      titlePashto: 'رحمان بابا',
      subtitle: 'Classical spiritual poetry',
      summary: 'Rahman Baba remains one of the clearest entry points into reflective Pashto poetry centered on humility, ethics, and inner life.',
      body: 'His verse is often used for both literary appreciation and gentle moral teaching, making it accessible to new readers and deeply meaningful to fluent speakers.',
      tags: ['classical', 'poetry', 'ethics', 'spirituality'],
      verificationStatus: 'curated',
    },
    {
      id: 'poetry-khushal',
      collection: 'poetry',
      title: 'Khushal Khan Khattak',
      titlePashto: 'خوشحال خان خټک',
      subtitle: 'Poetry of identity and courage',
      summary: 'Khushal Khan Khattak brings together literature, political feeling, courage, and public dignity in Pashto writing.',
      body: 'His work is central for readers who want to connect poetry with history, honor, self-respect, and collective identity.',
      tags: ['history', 'leadership', 'identity', 'poetry'],
      verificationStatus: 'curated',
    },
    {
      id: 'poetry-landay',
      collection: 'poetry',
      title: 'Landay Folk Verse',
      titlePashto: 'لنډۍ',
      subtitle: 'Oral poetic tradition',
      summary: 'Landay compresses emotion, satire, grief, humor, and memory into a short poetic form with enormous cultural force.',
      body: 'It is one of the strongest bridges between spoken tradition and literary identity, especially for women’s voices and oral memory.',
      tags: ['folk', 'oral tradition', 'women', 'short form'],
      verificationStatus: 'curated',
    },
  ],
  books: [
    {
      id: 'books-beginner-readers',
      collection: 'books',
      title: 'Beginner Reading Passages',
      subtitle: 'Learner shelf',
      summary: 'Short, clear passages for readers moving from alphabet recognition into sentence-level confidence.',
      body: 'These texts work best when they combine everyday vocabulary, repetition, and cultural familiarity rather than abstract grammar drills.',
      tags: ['reading', 'learners', 'education'],
      verificationStatus: 'curated',
    },
    {
      id: 'books-folktales',
      collection: 'books',
      title: 'Folktales & Story Summaries',
      subtitle: 'Narrative shelf',
      summary: 'Story material preserves humor, moral teaching, local imagination, and the cadence of Pashto narration.',
      body: 'Short summaries and retellings are especially useful when full text access is limited but cultural storytelling still needs a place online.',
      tags: ['stories', 'folklore', 'family', 'reading'],
      verificationStatus: 'curated',
    },
    {
      id: 'books-family-reading',
      collection: 'books',
      title: 'Children & Family Reading',
      subtitle: 'Home learning shelf',
      summary: 'Family-friendly reading helps children and heritage speakers keep Pashto active inside everyday home life.',
      body: 'This area is especially important for diaspora households that want language material suitable for shared reading and conversation.',
      tags: ['children', 'family', 'diaspora', 'reading'],
      verificationStatus: 'curated',
    },
  ],
  names: [
    {
      id: 'names-meena',
      collection: 'names',
      title: 'مینه',
      subtitle: 'Meena',
      summary: 'Meaning: love. A warm and widely recognized Pashto name and word.',
      body: 'Its emotional clarity makes it meaningful both as a personal name and as a literary word inside poetry and songs.',
      tags: ['love', 'name', 'identity'],
      verificationStatus: 'curated',
    },
    {
      id: 'names-hila',
      collection: 'names',
      title: 'هیله',
      subtitle: 'Hila',
      summary: 'Meaning: hope. A name that carries optimism, patience, and future direction.',
      body: 'This name often resonates strongly in educational and family contexts because of its association with aspiration.',
      tags: ['hope', 'name', 'future'],
      verificationStatus: 'curated',
    },
    {
      id: 'names-spogmai',
      collection: 'names',
      title: 'سپوږمۍ',
      subtitle: 'Spogmai',
      summary: 'Meaning: moon. A poetic name connected to beauty, light, and tenderness.',
      body: 'Its imagery makes it especially visible in literary and affectionate forms of speech.',
      tags: ['moon', 'poetic', 'name'],
      verificationStatus: 'curated',
    },
  ],
  media: [
    {
      id: 'media-bbc-pashto',
      collection: 'media',
      title: 'BBC Pashto',
      subtitle: 'News and public affairs',
      summary: 'A major source for contemporary Pashto news, interviews, and public conversation.',
      body: 'It is useful both for staying informed and for hearing formal register Pashto in ongoing use.',
      tags: ['news', 'journalism', 'listening'],
      verificationStatus: 'curated',
    },
    {
      id: 'media-voa-pashto',
      collection: 'media',
      title: 'VOA Pashto',
      subtitle: 'News and discussion',
      summary: 'A helpful source for current events, interviews, and spoken Pashto in informational settings.',
      body: 'It can be especially useful for learners who want exposure to public speech and headline vocabulary.',
      tags: ['news', 'discussion', 'language exposure'],
      verificationStatus: 'curated',
    },
    {
      id: 'media-diaspora-circles',
      collection: 'media',
      title: 'Diaspora Learning Circles',
      subtitle: 'Community life abroad',
      summary: 'Family groups, student networks, and local circles help Pashto stay active beyond the homeland.',
      body: 'Diaspora spaces matter because they often preserve intergenerational language transmission under pressure from dominant languages.',
      tags: ['diaspora', 'community', 'education'],
      verificationStatus: 'curated',
    },
  ],
}

export function getResourceCollectionMeta(collection: ResourceCollectionKey): ResourceCollectionMeta {
  return resourceCollections.find((item) => item.key === collection) ?? resourceCollections[0]
}