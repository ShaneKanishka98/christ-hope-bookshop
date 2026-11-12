// Demo catalogue & ministry content. Books are proposed concepts — NOT published.
export const YOUTUBE_URL = "https://www.youtube.com/@ChristHopeMediaOfficial";

export const categories = [
  "Daily Prayer Books",
  "Morning Prayer Books",
  "Evening Prayer Books",
  "Healing and Comfort",
  "Faith and Spiritual Growth",
  "Christian Devotionals",
  "Bible Study Guides",
  "Prayer Books for Families",
  "Peace, Anxiety and Worry",
  "Hope and Encouragement",
] as const;

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  category: (typeof categories)[number];
  description: string;
  discover: string[];
  toc: string[];
  sample: string;
  formats: ("EPUB" | "PDF")[];
  language: string;
  pages: number | null;
  price: number; // USD, proposed
  added: string; // ISO date for "newest" sorting
  featured?: boolean;
  amazonUrl?: string; // only set when a real Kindle listing exists
  cover: { from: string; to: string; motif: "sun" | "moon" | "cross" | "dove" | "heart" | "book" };
};

const author = "CHRIST HOPE";

export const books: Book[] = [
  {
    slug: "365-days-of-prayer-and-faith",
    title: "365 Days of Prayer and Faith",
    subtitle: "A prayer for every day of the year",
    author,
    category: "Daily Prayer Books",
    description: "A year-long companion of short, heartfelt prayers paired with Scripture, written to help you meet God every single day.",
    discover: ["A simple daily rhythm of prayer", "A Bible verse for each day", "Space to reflect and give thanks"],
    toc: ["How to use this book", "January — New Beginnings", "April — Renewed Hope", "August — Steadfast Faith", "December — Light of the World"],
    sample: "Lord, as this new day begins, I place it in Your hands. Before the noise of the world reaches me, let me hear Your gentle voice. Guide my steps, guard my heart and teach me to walk in Your love. Amen.",
    formats: ["EPUB", "PDF"], language: "English", pages: null, price: 14.99, added: "2026-10-01", featured: true,
    cover: { from: "var(--midnight)", to: "var(--royal)", motif: "sun" },
  },
  {
    slug: "morning-prayers-to-begin-your-day",
    title: "Morning Prayers to Begin Your Day with God",
    subtitle: "Start each morning in His presence",
    author,
    category: "Morning Prayer Books",
    description: "Gentle morning prayers for courage, gratitude and direction — perfect for your first quiet minutes of the day.",
    discover: ["Prayers for work, family and purpose", "Morning gratitude practices", "Verses to carry through the day"],
    toc: ["Welcome", "Prayers of Gratitude", "Prayers for Guidance", "Prayers for Strength", "Blessings for the Day"],
    sample: "Father, thank You for the gift of this morning. Your mercies are new, and so is my hope. Fill me with Your peace so that I may carry it to everyone I meet today. Amen.",
    formats: ["EPUB", "PDF"], language: "English", pages: null, price: 9.99, added: "2026-09-12", featured: true,
    cover: { from: "oklch(0.55 0.1 60)", to: "oklch(0.32 0.07 250)", motif: "sun" },
  },
  {
    slug: "evening-prayers-for-peaceful-rest",
    title: "Evening Prayers for Peaceful Rest",
    subtitle: "Lay down the day and rest in God",
    author,
    category: "Evening Prayer Books",
    description: "Calming prayers to release the worries of the day and fall asleep held in the peace of Christ.",
    discover: ["Prayers to release worry", "Evening examen reflections", "Psalms for restful sleep"],
    toc: ["A Quiet Ending", "Letting Go", "Forgiveness Before Sleep", "Psalms of Rest"],
    sample: "Lord, the day is done. I give You what went well and what went wrong. Quiet my mind, calm my heart and watch over those I love tonight. In You I rest. Amen.",
    formats: ["EPUB", "PDF"], language: "English", pages: null, price: 9.99, added: "2026-08-20",
    cover: { from: "oklch(0.18 0.05 270)", to: "oklch(0.3 0.08 260)", motif: "moon" },
  },
  {
    slug: "30-days-of-faith-hope-and-love",
    title: "30 Days of Faith, Hope and Love",
    subtitle: "A one-month devotional journey",
    author,
    category: "Christian Devotionals",
    description: "Thirty short devotions built around the three things that remain — faith, hope and love.",
    discover: ["Ten days on each theme", "Daily reflection questions", "A closing prayer every day"],
    toc: ["Part I — Faith", "Part II — Hope", "Part III — Love", "Going Forward"],
    sample: "\"And now these three remain: faith, hope and love. But the greatest of these is love.\" Today, ask God to show you one person who needs to experience His love through you.",
    formats: ["EPUB", "PDF"], language: "English", pages: null, price: 7.99, added: "2026-10-18", featured: true,
    cover: { from: "oklch(0.3 0.07 250)", to: "oklch(0.5 0.1 70)", motif: "heart" },
  },
  {
    slug: "prayers-for-anxiety-fear-and-worry",
    title: "Prayers for Anxiety, Fear and Worry",
    subtitle: "Finding God's peace in anxious seasons",
    author,
    category: "Peace, Anxiety and Worry",
    description: "Honest, comforting prayers for anxious hearts, grounded in the promises of Scripture.",
    discover: ["Prayers for sleepless nights", "Scripture to stand on", "Breath prayers for hard moments"],
    toc: ["You Are Not Alone", "When Fear Comes", "Casting Your Cares", "Peace That Guards the Heart"],
    sample: "Jesus, my thoughts are racing and my heart feels heavy. You said, \"Do not worry about tomorrow.\" Help me trust You with this moment, and then the next. Amen.",
    formats: ["EPUB", "PDF"], language: "English", pages: null, price: 8.99, added: "2026-07-30",
    cover: { from: "oklch(0.35 0.06 220)", to: "oklch(0.22 0.05 255)", motif: "dove" },
  },
  {
    slug: "healing-prayers-for-difficult-times",
    title: "Healing Prayers for Difficult Times",
    subtitle: "Comfort for body, mind and spirit",
    author,
    category: "Healing and Comfort",
    description: "Prayers for healing, grief and recovery, offering gentle comfort when life is hardest.",
    discover: ["Prayers for illness and recovery", "Comfort in grief", "Praying for loved ones"],
    toc: ["The God Who Heals", "Prayers in Sickness", "Prayers in Grief", "Hope Restored"],
    sample: "Lord, You are close to the brokenhearted. Hold me in this difficult season. Bring healing where there is pain and hope where there is sorrow. Amen.",
    formats: ["EPUB", "PDF"], language: "English", pages: null, price: 9.99, added: "2026-06-15",
    cover: { from: "oklch(0.4 0.06 170)", to: "oklch(0.24 0.05 250)", motif: "cross" },
  },
  {
    slug: "walking-with-jesus-daily-devotional",
    title: "Walking with Jesus",
    subtitle: "A Daily Devotional",
    author,
    category: "Faith and Spiritual Growth",
    description: "Daily reflections on the life and words of Jesus to help you follow Him more closely.",
    discover: ["Reflections on the Gospels", "Practical steps of discipleship", "Prayers to grow in faith"],
    toc: ["Come, Follow Me", "The Sermon on the Mount", "Parables of the Kingdom", "The Road to Easter"],
    sample: "Jesus never rushed past the person in front of Him. Today, slow down. Ask Him to help you see people the way He sees them.",
    formats: ["EPUB", "PDF"], language: "English", pages: null, price: 11.99, added: "2026-10-28",
    cover: { from: "oklch(0.26 0.06 256)", to: "oklch(0.42 0.08 60)", motif: "book" },
  },
  {
    slug: "100-powerful-prayers-for-every-season",
    title: "100 Powerful Prayers for Every Season of Life",
    subtitle: "Prayers for joy, trial and everything between",
    author,
    category: "Hope and Encouragement",
    description: "A treasury of one hundred prayers for celebration, waiting, loss, new beginnings and every season in between.",
    discover: ["Prayers organised by life season", "Prayers for family and friends", "Scripture for each season"],
    toc: ["Seasons of Joy", "Seasons of Waiting", "Seasons of Loss", "Seasons of New Beginnings"],
    sample: "Lord of every season, You are the same yesterday, today and forever. Whatever this season brings, let me find You faithful in it. Amen.",
    formats: ["EPUB", "PDF"], language: "English", pages: null, price: 12.99, added: "2026-09-30",
    cover: { from: "oklch(0.2 0.05 258)", to: "oklch(0.36 0.07 245)", motif: "cross" },
  },
];

export const getBook = (slug: string) => books.find((b) => b.slug === slug);

export type Prayer = { slug: string; category: string; title: string; text: string; verse: string; ref: string; related: string[] };

export const prayers: Prayer[] = [
  { slug: "morning-prayer", category: "Morning Prayer", title: "A Prayer to Begin the Day",
    text: "Heavenly Father, thank You for the gift of a new morning. Before I rush into the day, I pause to rest in You. Guide my words, guard my heart and order my steps. Let my work today honour You and my kindness reflect Your love. Whatever comes, remind me that You are with me. In Jesus' name, Amen.",
    verse: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.", ref: "Lamentations 3:22–23", related: ["morning-prayers-to-begin-your-day", "365-days-of-prayer-and-faith"] },
  { slug: "evening-prayer", category: "Evening Prayer", title: "A Prayer for Peaceful Rest",
    text: "Lord, the day is ending and I bring it all to You — the joys, the mistakes, the unfinished work. Forgive me where I fell short and thank You for every grace. Quiet my thoughts, calm my body and watch over those I love through the night. I rest because You never sleep. Amen.",
    verse: "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.", ref: "Psalm 4:8", related: ["evening-prayers-for-peaceful-rest"] },
  { slug: "prayer-for-peace", category: "Prayer for Peace", title: "A Prayer for Peace",
    text: "Prince of Peace, my heart is restless. Speak Your peace over every anxious thought. Teach me to bring my requests to You with thanksgiving, and let Your peace, which goes beyond understanding, guard my heart and mind. Amen.",
    verse: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", ref: "John 14:27", related: ["prayers-for-anxiety-fear-and-worry"] },
  { slug: "prayer-for-healing", category: "Prayer for Healing", title: "A Prayer for Healing",
    text: "Lord Jesus, You healed the sick and comforted the broken. I bring You my pain and the pain of those I love. Touch our bodies, minds and spirits with Your healing power. Give wisdom to doctors, strength to caregivers and hope to all who wait. Amen.",
    verse: "He heals the brokenhearted and binds up their wounds.", ref: "Psalm 147:3", related: ["healing-prayers-for-difficult-times"] },
  { slug: "prayer-for-protection", category: "Prayer for Protection", title: "A Prayer for Protection",
    text: "Almighty God, be my refuge and my fortress. Cover my family, my home and my path with Your protection. Keep us from harm and from fear. When danger comes near, let us remember that You are nearer still. Amen.",
    verse: "The Lord will keep you from all harm — he will watch over your life.", ref: "Psalm 121:7", related: ["100-powerful-prayers-for-every-season"] },
  { slug: "prayer-for-family", category: "Prayer for Family", title: "A Prayer for My Family",
    text: "Father, thank You for my family. Bind us together with patience, forgiveness and love. Heal what is broken between us, bless our home with peace and help each of us grow closer to You. Amen.",
    verse: "As for me and my household, we will serve the Lord.", ref: "Joshua 24:15", related: ["100-powerful-prayers-for-every-season"] },
  { slug: "prayer-for-strength", category: "Prayer for Strength", title: "A Prayer for Strength",
    text: "Lord, I am weary and my strength is small. Be my strength today. When I cannot go on, carry me. Renew my spirit so that I may rise again with hope, knowing that Your grace is enough for me. Amen.",
    verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", ref: "Isaiah 40:31", related: ["walking-with-jesus-daily-devotional"] },
  { slug: "prayer-for-hope", category: "Prayer for Hope", title: "A Prayer for Hope",
    text: "God of hope, when the future feels uncertain, anchor my soul in You. Fill me with joy and peace as I trust in You, so that I may overflow with hope by the power of the Holy Spirit. Amen.",
    verse: "May the God of hope fill you with all joy and peace as you trust in him.", ref: "Romans 15:13", related: ["30-days-of-faith-hope-and-love"] },
  { slug: "prayer-for-guidance", category: "Prayer for Guidance", title: "A Prayer for Guidance",
    text: "Lord, I stand at a crossroads and I need Your wisdom. Light my path and make my next step clear. Help me to trust You with all my heart and not lean on my own understanding. Amen.",
    verse: "Trust in the Lord with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5", related: ["walking-with-jesus-daily-devotional"] },
  { slug: "prayer-for-difficult-times", category: "Prayer for Difficult Times", title: "A Prayer for Difficult Times",
    text: "Jesus, this season is hard. I do not understand everything that is happening, but I choose to trust You. Hold me close, give me strength for today and remind me that this is not the end of my story. Amen.",
    verse: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", ref: "Psalm 34:18", related: ["healing-prayers-for-difficult-times", "prayers-for-anxiety-fear-and-worry"] },
];

export const getPrayer = (slug: string) => prayers.find((p) => p.slug === slug);

export type Verse = { category: string; text: string; ref: string };
// Scripture quotations: New International Version (NIV).
export const verses: Verse[] = [
  { category: "Faith", text: "Now faith is confidence in what we hope for and assurance about what we do not see.", ref: "Hebrews 11:1" },
  { category: "Faith", text: "For we live by faith, not by sight.", ref: "2 Corinthians 5:7" },
  { category: "Hope", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
  { category: "Hope", text: "May the God of hope fill you with all joy and peace as you trust in him.", ref: "Romans 15:13" },
  { category: "Love", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", ref: "1 Corinthians 13:4" },
  { category: "Love", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16" },
  { category: "Peace", text: "Peace I leave with you; my peace I give you.", ref: "John 14:27" },
  { category: "Peace", text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", ref: "Philippians 4:7" },
  { category: "Strength", text: "I can do all this through him who gives me strength.", ref: "Philippians 4:13" },
  { category: "Strength", text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.", ref: "Psalm 28:7" },
  { category: "Forgiveness", text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.", ref: "Ephesians 4:32" },
  { category: "Forgiveness", text: "If we confess our sins, he is faithful and just and will forgive us our sins.", ref: "1 John 1:9" },
  { category: "Courage", text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
  { category: "Courage", text: "The Lord is my light and my salvation — whom shall I fear?", ref: "Psalm 27:1" },
  { category: "God's Promises", text: "Never will I leave you; never will I forsake you.", ref: "Hebrews 13:5" },
  { category: "God's Promises", text: "And we know that in all things God works for the good of those who love him.", ref: "Romans 8:28" },
];

export const messages = [
  { title: "Don't Worry About Tomorrow", text: "Jesus invites you to live in today's grace and leave tomorrow in the Father's hands.", ref: "Matthew 6:34", prayer: "prayer-for-peace" },
  { title: "God Has Not Forgotten You", text: "Even when it feels silent, He is writing your story with perfect love.", ref: "Isaiah 49:15", prayer: "prayer-for-hope" },
  { title: "Trust God's Timing", text: "Waiting is not wasted. God is never late and never early.", ref: "Ecclesiastes 3:11", prayer: "prayer-for-guidance" },
  { title: "You Are Never Alone", text: "In every valley and on every mountain, He walks beside you.", ref: "Matthew 28:20", prayer: "prayer-for-difficult-times" },
  { title: "Give Your Worries to God", text: "Cast every care on Him, because He truly cares for you.", ref: "1 Peter 5:7", prayer: "prayer-for-peace" },
  { title: "Jesus Is Your Strength", text: "When you are weak, His strength is made perfect in you.", ref: "2 Corinthians 12:9", prayer: "prayer-for-strength" },
  { title: "Never Lose Your Faith", text: "Hold on. The One who began a good work in you will carry it to completion.", ref: "Philippians 1:6", prayer: "prayer-for-hope" },
  { title: "God Sees Your Tears", text: "Not one tear falls unnoticed. He collects them all and will wipe them away.", ref: "Psalm 56:8", prayer: "prayer-for-healing" },
];

export const verseOfTheDay = () => {
  const day = Math.floor(Date.now() / 86400000);
  return verses[day % verses.length] ?? verses[0]!;
};

// Set to true to show the bookstore, cart, prices and checkout again.
export const SHOP_ENABLED = false;

// YouTube embeds
export const shortVideos = ["U58tDSuelHE", "w2JsVewVcj4", "Kr5qGRqXaDA", "oQWl77JqwHI", "1n2LkeOYmQU", "qAgtKXREqSk", "n3xO-mLJNyE", "y8Dvjhz5k7w", "mz6TGSxWIqs"];
export const miracleVideo = "mZanUmYXBy8";

// Jesus images (public/jesus/jesus-1.jpg … jesus-6.jpg), cycled across prayers.
export const jesusImage = (index: number) => `/jesus/jesus-${(index % 6) + 1}.jpg`;
export const prayerImage = (slug: string) => jesusImage(Math.max(0, prayers.findIndex((p) => p.slug === slug)));
