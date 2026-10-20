// Initial content, taken from the original hard-coded components.
// Used by scripts/setup-db.mjs only when the assessments table is empty.

const identifyQuestions = [
  ["When something difficult happens, what do you do first?", ["Look for what I did wrong", "Try to regain control", "Pull away and process alone", "Focus on the other person's needs"]],
  ["When someone disappoints you, how do you usually respond?", ["Question what I could have done differently", "Try to fix the situation immediately", "Withdraw and keep my feelings to myself", "Try to understand and reassure them"]],
  ["When you feel misunderstood, what is your first instinct?", ["Blame myself for not explaining clearly", "Explain my point until I feel understood", "Stop explaining and distance myself", "Focus on making the other person comfortable"]],
  ["When a relationship feels uncertain, what do you tend to do?", ["Wonder whether I am the problem", "Seek answers and reassurance", "Create distance to protect myself", "Try harder to keep the connection strong"]],
  ["When someone criticizes you, what feels most natural?", ["Take it personally and question myself", "Defend myself and explain my actions", "Shut down and avoid further discussion", "Agree to keep the situation peaceful"]],
  ["When you feel overwhelmed, how do you usually cope?", ["Analyze what I should have done better", "Make a plan to regain control", "Withdraw until I can process everything", "Put other people's needs before my own"]],
  ["When you need support, what is hardest for you?", ["Feeling like I am asking for too much", "Not knowing how to solve the problem myself", "Opening up about what I am feeling", "Worrying about burdening someone else"]],
  ["When conflict arises, what do you tend to prioritize?", ["Understanding what I did wrong", "Finding a solution as quickly as possible", "Getting space away from the tension", "Restoring harmony between everyone"]],
  ["When someone becomes distant, what do you usually assume?", ["I must have done something wrong", "I need to find out what has changed", "I should distance myself too", "I should do more to reconnect"]],
  ["When your needs conflict with someone else's, what do you do?", ["Feel guilty for having needs of my own", "Try to negotiate an outcome that works", "Keep my needs private and step back", "Put their needs first to avoid tension"]],
  ["When you make a mistake, how do you typically react?", ["Replay it and criticize myself", "Fix it immediately and regain control", "Avoid thinking about it for a while", "Worry about how it affected others"]],
  ["When the same problem keeps repeating, what do you do?", ["Look inward for what I need to change", "Try a new strategy to change the outcome", "Pull back to protect my energy", "Work harder to make things better for everyone"]],
];

// Option index (0..3) => profile index (0..3)
const identifyProfiles = [
  {
    title: "The Overthinker",
    short_description: "Runs scenarios, seeks reassurance, struggles to let go.",
    image: "/images/assessment/overthinker.png",
    quote: "You are not too much. You are just used to carrying more than you should",
    core_insight: "You may be trying to find certainty through understanding.",
    notices: ["Replaying conversations", "Searching for explanations", "Second-guessing yourself", "Difficulty leaving things unresolved"],
    pattern_steps: ["Trigger", "Questioning", "Overthinking", "Exhaustion", "More questioning"],
    reflection: "What would happen if you didn't need to understand everything before allowing yourself to move forward?",
  },
  {
    title: "The Controller",
    short_description: "Feels safer with structure, finds it hard to be vulnerable.",
    image: "/images/assessment/controller.png",
    quote: "Strength is not holding everything together. Sometimes it is allowing yourself to be held.",
    core_insight: "You may be trying to find safety through control.",
    notices: ["Needing a plan for everything", "Finding it hard to delegate or rely on others", "Feeling anxious when things are uncertain", "Fixing problems before feeling them"],
    pattern_steps: ["Uncertainty", "Anxiety", "Taking control", "Tension", "More control"],
    reflection: "What might you feel if you didn't have to hold everything together on your own?",
  },
  {
    title: "The Protector",
    short_description: "Builds emotional walls, avoids getting hurt again.",
    image: "/images/assessment/protector.png",
    quote: "The walls that kept you safe can also keep out what you most need.",
    core_insight: "You may be trying to stay safe through distance.",
    notices: ["Keeping feelings to yourself", "Pulling away when things feel close", "Preferring to cope alone", "Finding it hard to trust others fully"],
    pattern_steps: ["Hurt", "Withdrawal", "Isolation", "Loneliness", "More distance"],
    reflection: "What would it take to feel safe enough to let someone a little closer?",
  },
  {
    title: "The Over-Adapter",
    short_description: "Prioritizes others' needs, loses sight of their own.",
    image: "/images/assessment/adapter.png",
    quote: "Your needs are not a burden. They are a part of you that deserves care too.",
    core_insight: "You may be trying to stay connected by putting yourself last.",
    notices: ["Saying yes when you mean no", "Feeling responsible for others' feelings", "Avoiding conflict at your own expense", "Losing touch with what you want"],
    pattern_steps: ["Tension", "Accommodating", "Self-neglect", "Resentment", "More accommodating"],
    reflection: "What would change if your needs mattered as much as everyone else's?",
  },
];

export const seedAssessments = [
  {
    slug: "relationship-hurt",
    title: "What Is Really Hurting You in Your Relationships?",
    description: "Discover the emotional patterns beneath relationship pain.",
    duration: "5 Minutes",
    image: "/images/assessment/assessment-1.png",
  },
  {
    slug: "grief",
    title: "What Kind of Grief Are You Carrying?",
    description: "Explore the losses that may still be asking for peace.",
    duration: "3 Minutes",
    image: "/images/assessment/assessment-2.png",
  },
  {
    slug: "losing-yourself",
    title: "Are You Losing Yourself in Your Relationship?",
    description: "Notice where connection may be coming at the cost of self.",
    duration: "3 Minutes",
    image: "/images/assessment/assessment-3.png",
  },
  {
    slug: "respond-when-hurt",
    title: "How Do You Respond When You Feel Hurt?",
    description: "Understand your instinctive response to emotional pain.",
    duration: "3 Minutes",
    image: "/images/assessment/assessment-4.png",
  },
  {
    slug: "ready-for-change",
    title: "Are You Ready for Change?",
    description: "Explore where you are in your readiness for personal change.",
    duration: "3 Minutes",
    image: "/images/assessment/assessment-5.png",
  },
  {
    slug: "identify-your-pattern",
    title: "Identify Your Pattern",
    description: "Recognize the thoughts, emotions and behaviors that may keep repeating.",
    intro_text:
      "What keeps repeating may be trying to tell you something. This reflection helps you notice the thoughts, emotions and behaviours that may sit beneath recurring experiences.",
    duration: "5–7 Minutes",
    image: "/images/assessment/assessment-6.png",
    closing_title: "Your pattern is not your identity.",
    closing_text:
      "A pattern is something you have learned. It is not who you are.\n\nPatterns often develop for understandable reasons. They may once have helped you cope, protect yourself, maintain relationships or navigate difficult experiences.\n\nWhat has been learned can be understood, questioned and changed.",
    final_reflection: "What keeps repeating in your life – and what might it be asking you to understand?",
    profiles: identifyProfiles,
    questions: identifyQuestions.map(([question, options]) => ({
      question,
      type: "choice",
      options: options.map((text, i) => ({ text, profileIndex: i })),
    })),
  },
];
