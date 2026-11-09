/**
 * The Inner Library — journal articles.
 *
 * Body text uses a tiny markup (parsed by components/inner-library/rich-text.js):
 *   - blank line      → new paragraph
 *   - "> text"        → highlighted quote / callout
 *   - "- text"        → list item
 *   - *text*          → italic
 *
 * layout:
 *   "inline"  → text column with images floated beside the text
 *   "feature" → wide feature image + right column (image card, contents, reflection card)
 */

const IMG = "/images/inner-library";

export const ARTICLES = [
  // ───────────────────────────── Journal 1 ─────────────────────────────
  {
    slug: "the-patterns-we-dont-notice",
    category: "self-awareness",
    title: "The Patterns We Don't Notice",
    subtitle: "Some of the patterns shaping our lives are the very ones we struggle to see.",
    excerpt: "How familiar thoughts and emotional responses quietly shape the lives we live.",
    date: "2026-10-12",
    readTime: "7 min read",
    pullQuote: "What feels familiar is not always what is good for us.",
    layout: "inline",
    images: {
      hero: `${IMG}/patterns-hero.jpg`,
      card: `${IMG}/card-patterns.jpg`,
      reflection: `${IMG}/patterns-reflection.jpg`,
    },
    inlineImages: [{ src: `${IMG}/patterns-inline.jpg`, alt: "Cracked stone face reflected in an antique mirror", section: "intro" }],
    intro: `We often believe that our difficulties arise from the people we meet, the circumstances we encounter, or the experiences life places before us. Yet, sometimes, what keeps repeating is not simply what happens to us, but how we respond to it.

We find ourselves in familiar conflicts, experience the same emotional disappointments, or return to situations we once promised ourselves we would never tolerate again. The faces may change. The circumstances may look different. Yet the emotional experience feels strangely familiar.

> What if the pattern we keep trying to escape is one we have yet to recognise within ourselves?`,
    sections: [
      {
        heading: "The familiarity we mistake for truth",
        body: `Our minds develop ways of interpreting the world through experience. We form beliefs about who we are, what we deserve, how others will treat us, and what we must do to feel accepted, secure, or valued.

Over time, these interpretations can become so familiar that we stop questioning them.

We may interpret distance as rejection, disagreement as disrespect, or uncertainty as a sign that something is wrong. We may overextend ourselves to feel needed, withdraw to protect ourselves from disappointment, or seek control when we feel emotionally unsafe.

These responses are not always conscious choices. Often, they are familiar ways of navigating experiences we have not fully understood.

The difficulty begins when a response that once helped us cope starts limiting how we live.`,
      },
      {
        heading: "When the pattern becomes invisible",
        body: `A pattern is particularly difficult to recognise when we believe the problem exists entirely outside us.

We may repeatedly ask why others misunderstand us without examining how we communicate. We may question why we attract similar relationships without considering what feels familiar about the people we choose. We may blame our circumstances for our unhappiness without noticing the beliefs through which we interpret those circumstances.

This does not mean that we are responsible for everything that happens to us. Other people make their own choices, and some experiences are genuinely unfair or harmful.

But recognising our patterns allows us to distinguish between what happens to us and the part we can influence in how we respond.

> Self-awareness begins when we become willing to examine our own contribution without assuming responsibility for everyone else's behaviour.`,
      },
      {
        heading: "Awareness is where the pattern begins to change",
        body: `Recognising a pattern does not mean judging ourselves for having it. Nor does understanding where it came from automatically make it disappear.

It means becoming curious enough to pause before repeating it.

When we feel rejected, can we question the interpretation before accepting it as truth? When conflict arises, can we recognise our emotional response before reacting? When we find ourselves in a familiar situation, can we ask what feels known about it, even when it is no longer good for us?

These questions create space between an experience and our response to it. Within that space, a different choice becomes possible.

We begin to understand that not every familiar feeling is a reliable guide, not every deeply held belief is an unquestionable truth, and not every habitual response still serves us.`,
      },
      {
        heading: "The work of looking inward",
        body: `The purpose of self-awareness is not to turn every difficulty into an examination of ourselves. It is to see more clearly, respond more consciously, and recognise where our freedom of choice begins.

Some patterns require grief. Others require boundaries, new skills, difficult decisions, or support. Many require patience as we learn to respond differently to what once felt automatic.

The work is not to become someone who never repeats a mistake. It is to become someone who notices sooner, understands more deeply, and chooses with greater intention.

Perhaps the most significant shift occurs when we stop asking only, *"Why does this keep happening to me?"* and begin asking, *"What is this experience revealing about the way I see, interpret, and respond to my world?"*

That question does not diminish what we have experienced. It opens a door to understanding what we can change.

> We cannot transform a pattern we refuse to recognise. And we cannot recognise what we are unwilling to examine.

The journey inward begins with the courage to see ourselves more honestly.`,
      },
    ],
    reflection: {
      title: "A Reflection to Carry With You",
      intro: "Think of a situation that seems to repeat in your life.",
      questions: [
        "What usually triggers your emotional response?",
        "What do you tend to believe about yourself or others in that moment?",
        "How do you respond, and what does that response help you avoid or protect?",
        "What might become possible if you responded with awareness rather than habit?",
      ],
      outro: [
        "You do not need to find every answer today. Sometimes, noticing the pattern is the first meaningful change.",
      ],
    },
  },

  // ───────────────────────────── Journal 2 ─────────────────────────────
  {
    slug: "when-awareness-becomes-change",
    category: "inner-transformation",
    title: "When Awareness Becomes Change",
    subtitle: "Understanding ourselves is a beginning. Transformation asks us to do something with what we discover.",
    excerpt: "Understanding ourselves is a beginning. Transformation asks us to do something with what we discover.",
    date: "2026-10-15",
    readTime: "8 min read",
    pullQuote: "Awareness opens the door. It is our actions that allow us to walk through it.",
    layout: "inline",
    images: {
      hero: `${IMG}/awareness-hero.jpg`,
      card: `${IMG}/card-awareness.jpg`,
      reflection: `${IMG}/awareness-reflection.jpg`,
    },
    inlineImages: [
      { src: `${IMG}/awareness-inline.jpg`, alt: "An open wooden door leading to a sunlit valley", section: "intro" },
      {
        src: `${IMG}/awareness-hourglass.jpg`,
        alt: "An hourglass resting on old books",
        caption: "Transformation is not a single moment, but a series of conscious choices.",
        section: 4,
      },
    ],
    asideQuotes: [{ section: 1, text: "Knowing what needs to change is important. Choosing to change it is what transforms our lives." }],
    intro: `Awareness can be a profound experience. It brings clarity to what once felt confusing, helps us recognise patterns we had not noticed, and reveals the beliefs that have quietly shaped our choices.

We begin to understand why certain situations affect us deeply, why we repeat familiar responses, and why some of our decisions seem to contradict what we consciously want for ourselves.

Yet, understanding a pattern does not automatically change it.

We can recognise that we seek validation and still struggle to stop depending on it. We can understand that a relationship is no longer serving us and still find ourselves returning to it. We can acknowledge that our reactions are shaped by past experiences and continue responding in the same familiar ways.

> Awareness opens the door. It is our actions that allow us to walk through it.`,
    sections: [
      {
        heading: "Awareness is not the destination",
        body: `There is a difference between knowing why we behave a certain way and learning to behave differently.

Insight helps us make sense of our experiences. It gives us language for what we feel, reveals the beliefs behind our reactions, and allows us to see possibilities that were previously hidden.

But awareness alone does not necessarily alter the habits, emotional responses, or beliefs that have become deeply ingrained.

We may know that our fear of rejection influences our relationships, yet continue seeking reassurance at the expense of our own peace. We may understand that we avoid difficult conversations, yet continue choosing silence because confrontation feels uncomfortable.

This is the gap between knowing and doing.

And it is often within this gap that meaningful change begins.`,
      },
      {
        heading: "The gap between knowing and doing",
        body: `Many of us assume that once we understand a problem, changing it should become relatively straightforward. When our behaviour does not change, we may interpret the struggle as a lack of discipline or willpower.

But familiar patterns are not always easy to interrupt.

They may have developed through years of repetition, emotional conditioning, and beliefs that once helped us navigate difficult experiences. Even when these responses no longer serve us, familiarity can make them feel safer than uncertainty.

We may return to what hurts us because we know how to navigate it. We may avoid what could help us because it requires us to tolerate discomfort, risk disappointment, or question an identity we have carried for years.

Recognising this does not mean we are powerless. It means that change requires more than a decision to do better.

It requires us to understand what keeps the pattern in place and practise responding differently.`,
      },
      {
        heading: "Change requires more than insight",
        body: `Lasting transformation begins when awareness becomes an active part of how we live.

It may mean pausing before reacting defensively, expressing a need instead of expecting someone else to recognise it, or setting a boundary even when the fear of disappointing others feels uncomfortable.

It may mean questioning an assumption before treating it as truth, choosing a different response when an old trigger appears, or allowing ourselves to experience an unfamiliar emotion without immediately trying to escape it.

These choices may seem small, but they interrupt the automatic responses that keep familiar patterns alive.

Change also asks us to accept that doing something differently will not always feel natural at first. A healthier response may initially feel unfamiliar. A necessary boundary may bring guilt. A new way of thinking may challenge beliefs we have held for a long time.

Discomfort does not always mean we are making the wrong choice. Sometimes, it is part of learning to live beyond the limits of what has become familiar.

> We do not change simply because we understand ourselves. We change when that understanding begins to influence what we choose, what we practise, and what we are willing to do differently.`,
      },
      {
        heading: "From awareness to a different way of living",
        body: `When awareness translates into action, our relationship with ourselves begins to change.

We become more capable of recognising an emotional reaction without allowing it to dictate our behaviour. We learn to question our interpretations rather than treating every thought as a fact. We begin making choices based on what aligns with our values, rather than what offers immediate relief from discomfort.

This does not mean we will never fall back into old patterns. Transformation is rarely a straight line, and familiar responses may return, particularly under stress.

The difference is that we begin to notice them sooner. We become more willing to take responsibility for our responses, repair what needs repairing, and return to the choices we want to make.

Over time, repeated conscious choices can create new ways of thinking, responding, and relating to ourselves and others.

The goal is not perfection. It is greater awareness, greater agency, and a growing ability to live in alignment with what we know matters.`,
      },
      {
        heading: "The work of becoming",
        body: `Perhaps one of the most important questions we can ask ourselves is not simply, *"What have I come to understand?"* but, *"What am I willing to do differently because of what I now understand?"*

What belief are we ready to question? What response are we ready to interrupt? What boundary have we recognised we need but have yet to establish? What familiar behaviour are we prepared to stop defending simply because we understand where it came from?

We do not need to transform every aspect of ourselves at once. Sometimes, the most meaningful beginning is one conscious pause, one honest conversation, one different response, or one decision that reflects a deeper understanding of ourselves.

Awareness gives us the opportunity to see. Action gives that awareness direction.

And it is through the repeated practice of choosing differently that insight begins to become transformation.

> Awareness is where the journey begins. Change is how we continue it.`,
      },
    ],
    reflection: {
      title: "A Reflection to Carry With You",
      intro: "Take a moment to consider something you have come to understand about yourself but have not yet translated into change.",
      questions: [
        "What pattern are you now aware of?",
        "What familiar belief or emotional response keeps it in place?",
        "What is one small but meaningful step you could take to respond differently?",
        "What discomfort might you need to tolerate to sustain that change?",
        "What support, mindset, or boundary could help you move forward?",
      ],
      outro: ["You do not need to change everything today. Begin with one choice that brings your actions closer to what you now understand."],
    },
  },

  // ───────────────────────────── Journal 3 ─────────────────────────────
  {
    slug: "the-stories-we-tell-ourselves",
    category: "cognitive-reframing",
    title: "The Stories We Tell Ourselves",
    subtitle: "Sometimes, what shapes our experience most is not what happens to us, but the meaning we attach to it.",
    excerpt: "The meaning we assign to an experience can shape how we carry it forward.",
    date: "2026-10-18",
    readTime: "9 min read",
    pullQuote: "The same event can carry different meanings depending on the perspective through which we view it.",
    layout: "feature",
    images: {
      hero: `${IMG}/stories-hero.jpg`,
      card: `${IMG}/card-stories.jpg`,
      feature: `${IMG}/stories-feature.jpg`,
      side: `${IMG}/stories-side.jpg`,
      reflection: `${IMG}/stories-reflection.jpg`,
    },
    sideQuote: "A pause between the event and its meaning creates the space for a different choice.",
    intro: `We move through life interpreting everything we encounter. A delayed response, a difficult conversation, a missed opportunity, or a moment of rejection rarely remains just an event. Our minds instinctively assign meaning to it, drawing on our beliefs, past experiences, expectations, and fears.

Someone becomes distant, and we conclude we are no longer valued. We make a mistake, and we tell ourselves we are incapable. A plan falls apart, and we interpret it as evidence that things will never work out for us.

The event happens once. The story we construct around it can continue long after the moment has passed.

> We do not always suffer only from what happens to us. Sometimes, we suffer from what we believe it means.`,
    sections: [
      {
        heading: "The mind is an interpreter",
        body: `Our minds are constantly trying to make sense of the world. They draw on previous experiences to anticipate what might happen next, helping us navigate uncertainty and respond quickly to our surroundings.

But the interpretations that once helped us make sense of experience are not always accurate.

When we have experienced rejection, we may become more sensitive to signs of disapproval. When trust has been broken, we may begin interpreting uncertainty as a warning. When we have repeatedly felt inadequate, even ordinary mistakes can become evidence for a deeply held belief about our worth.

Over time, these interpretations can become automatic. We stop recognising them as explanations and begin treating them as facts.

We tell ourselves that someone ignored us because they do not care, that a disagreement means a relationship is failing, or that a setback proves we are not capable enough.

Yet, the same event can carry different meanings depending on the perspective through which we view it.

A delayed response might reflect disinterest, but it might also reflect distraction, competing responsibilities, or circumstances we know nothing about. A mistake might reveal an area that needs improvement without defining our entire ability. A difficult ending might bring genuine grief while also creating space for a different direction.

> The first interpretation that enters our mind is not necessarily the most accurate one.`,
      },
      {
        heading: "When a story becomes a limitation",
        body: `The stories we tell ourselves influence more than how we feel. They shape what we notice, how we respond, and what we believe is possible.

If we interpret criticism as humiliation, we may become defensive or withdraw. If we believe disagreement means rejection, we may suppress our needs to preserve approval. If we see failure as proof of inadequacy, we may avoid opportunities that could help us grow.

Our interpretations influence our behaviour, and our behaviour can reinforce the very beliefs that shaped those interpretations.

We withdraw because we expect rejection, receive less connection in return, and take that distance as confirmation that we were right to expect rejection in the first place.

The story becomes a lens through which we interpret subsequent experiences.

This does not mean that our difficulties are imaginary or that every painful experience is caused by negative thinking. Rejection, injustice, loss, and disappointment are real. Some circumstances genuinely require us to protect ourselves, establish boundaries, or make difficult decisions.

The question is not whether we should ignore reality.

It is whether we are seeing reality as clearly as we can, or viewing it through assumptions that have gone unexamined.`,
      },
      {
        heading: "Cognitive reframing: a different way of seeing",
        body: `Cognitive reframing invites us to examine the meaning we have assigned to an experience and consider whether another interpretation might be more balanced, accurate, and useful.

It is not about forcing ourselves to think positively, denying difficult emotions, or pretending that everything happens for a reason.

It is about creating enough distance from our first interpretation to question it.

When we find ourselves thinking, *"I always ruin everything,"* we can pause and ask whether one difficult experience truly supports such a sweeping conclusion.

When we think, *"They did not respond because they do not value me,"* we can distinguish what we know from what we are assuming.

When we tell ourselves, *"I will never get through this,"* we can acknowledge how overwhelming the present feels without treating that feeling as a prediction of the future.

Reframing does not require us to replace every painful thought with a comforting one. Sometimes, the most helpful interpretation is simply a more precise one.

Instead of telling ourselves that everything will work out, we might acknowledge that we do not know what will happen, but we can decide how to respond to what is happening now.

Instead of insisting that a painful experience was good for us, we might recognise that it hurt, that we would not have chosen it, and that we can still learn from it.

> Reframing is not changing the facts to make ourselves feel better. It is examining our interpretation so that our response can be guided by greater clarity.`,
      },
      {
        heading: "The space between an event and its meaning",
        body: `Imagine that someone you care about becomes distant.

Your immediate interpretation might be, *"I must have done something wrong. They no longer want me in their life."*

That interpretation may bring anxiety, prompting you to seek reassurance, withdraw before you can be rejected, or react defensively.

But what if you paused?

What do you actually know? The person has become distant. What do you not know? Their reasons, intentions, and understanding of the situation.

What else might explain the change? Is there a pattern of behaviour that supports your concern, or are you interpreting uncertainty through a previous experience?

Perhaps the distance does reflect a problem that needs to be addressed. Perhaps it has little to do with you. You may need an honest conversation to understand what is happening.

The purpose of reframing is not to convince yourself that everything is fine. It is to avoid turning an uncertain situation into a definite conclusion before you have enough information.

You can acknowledge your discomfort, communicate your concerns, and decide what boundaries you need without treating your first assumption as established truth.

That is the difference between reacting to the story and responding to the situation.`,
      },
      {
        heading: "From interpretation to choice",
        body: `Changing our perspective does not always change the circumstances around us. It can, however, change the range of responses available to us.

When we stop treating every mistake as proof of failure, we make room for learning. When we stop interpreting every disagreement as rejection, we become more capable of communicating honestly. When we question the belief that our worth depends on another person's approval, we begin to make choices that reflect our own values.

This process takes practice.

Our familiar interpretations may return, particularly when we are tired, distressed, or confronted with experiences that resemble earlier wounds. The aim is not to eliminate every automatic thought. It is to recognise when a thought may be incomplete, distorted, or unhelpful, and to develop the willingness to examine it.

We can learn to ask ourselves:

- What happened, and what meaning have I attached to it?
- What evidence supports my interpretation, and what might I be overlooking?
- Am I responding to the present situation, or to what it reminds me of?
- What is another plausible way of understanding this experience?
- Which interpretation allows me to respond with honesty, responsibility, and greater awareness?

These questions do not promise an easy answer. They help us approach our experiences with greater curiosity and less certainty about the assumptions we have made.`,
      },
      {
        heading: "The freedom to tell a different story",
        body: `We cannot always choose what happens to us. We cannot control how others behave, prevent every disappointment, or undo the experiences that have shaped us.

But we can learn to examine the meanings we assign to those experiences.

We can recognise when an old belief is influencing a present decision. We can acknowledge a painful emotion without allowing it to define our identity. We can distinguish between what has happened, what we fear it means, and what we choose to do next.

Perhaps the most significant shift occurs when we stop asking only, *"Why is this happening to me?"* and begin asking, *"How am I interpreting what is happening, and is that interpretation helping me see clearly?"*

The answer may not change the past. It may not resolve every difficulty. But it can help us meet the present with greater perspective and respond to the future with more intention.

We are not free to invent whatever reality we prefer. We are, however, capable of questioning the stories through which we understand the reality we face.

> Sometimes, transformation begins not when our circumstances change, but when we learn to see them differently.`,
      },
    ],
    reflection: {
      title: "A Reflection to Carry With You",
      intro: "Think of a recent situation that left you feeling hurt, anxious, rejected, or disappointed.",
      questions: [
        "What happened, without adding an interpretation?",
        "What story did you immediately tell yourself about the event?",
        "What emotions and behaviours followed from that interpretation?",
        "What evidence supports your conclusion, and what information might be missing?",
        "What is another plausible, balanced way to understand the situation?",
        "How might you respond differently if you approached it from this new perspective?",
      ],
      outro: [
        "You do not need to force yourself to believe a more positive story. Begin by allowing for the possibility that your first story may not be the whole story.",
      ],
    },
  },

  // ───────────────────────────── Journal 4 ─────────────────────────────
  {
    slug: "what-we-suppress-becomes-a-pattern",
    category: "emotions-and-healing",
    title: "What We Suppress Becomes a Pattern",
    subtitle: "What we refuse to feel does not necessarily disappear. Sometimes, it finds another way to express itself.",
    excerpt: "Unprocessed emotions do not disappear. They find other ways to show up.",
    date: "2026-10-20",
    readTime: "9 min read",
    pullQuote: "Unprocessed emotions don't disappear. They quietly find another way to show up in our lives.",
    layout: "feature",
    images: {
      hero: `${IMG}/suppress-hero.jpg`,
      card: `${IMG}/card-suppress.jpg`,
      feature: `${IMG}/suppress-feature.jpg`,
      side: `${IMG}/suppress-side.jpg`,
      reflection: `${IMG}/suppress-reflection.jpg`,
    },
    sideQuote: "Emotions suppressed become patterns. Emotions processed become wisdom.",
    intro: `We often learn to manage difficult emotions by pushing them aside. We tell ourselves to be strong, to move on, to stop overthinking, or to avoid dwelling on what hurts. We convince ourselves that if we do not acknowledge an emotion, we can prevent it from affecting us.

But an emotion does not cease to matter simply because we choose not to attend to it.

Unprocessed hurt may surface as irritability. Unacknowledged grief may leave us feeling disconnected. Unexpressed anger may emerge through resentment, withdrawal, or reactions that seem disproportionate to the situation before us.

What we believe we have left behind may continue influencing how we think, feel, and relate to others.

> What we suppress does not always disappear. Sometimes, it becomes a pattern we keep repeating.`,
    sections: [
      {
        heading: "The difference between feeling and processing",
        body: `We often confuse controlling an emotion with processing it.

Controlling an emotion may mean choosing not to react impulsively, postponing a difficult conversation until we are calmer, or finding a way to remain composed when circumstances demand it. These can be healthy and necessary responses.

Processing an emotion, however, asks us to go a step further. It requires us to acknowledge what we feel, understand what may have contributed to it, and recognise what the experience is revealing about our needs, beliefs, expectations, or boundaries.

We can choose not to act on anger without pretending it does not exist. We can continue with our responsibilities while allowing ourselves to grieve. We can remain composed in a difficult moment and still return later to what that moment brought up within us.

The problem is not that we sometimes set our emotions aside. It is when setting them aside becomes our only way of dealing with them.`,
      },
      {
        heading: "When an emotion becomes a pattern",
        body: `Emotional patterns often develop through repetition.

When expressing sadness was met with dismissal, we may have learned to hide our vulnerability. When disagreement threatened our sense of security, we may have learned to suppress anger to preserve a relationship. When our needs were repeatedly overlooked, we may have stopped expressing them altogether.

These responses may once have helped us navigate difficult circumstances. Over time, however, they can become automatic ways of protecting ourselves, even when the circumstances that shaped them have changed.

We may struggle to communicate what hurts us, expect others to recognise needs we never express, or withdraw emotionally when we feel misunderstood. We may become resentful without acknowledging our disappointment, or continue accommodating others while feeling increasingly disconnected from ourselves.

Eventually, we may begin to see these behaviours as fixed parts of our personality rather than patterns we have learned.

> Sometimes, what we call our personality is partly a collection of emotional responses we have repeated for so long that they have become familiar.

Recognising this is not about blaming ourselves for how we learned to cope. It is about understanding whether those ways of coping still serve us.`,
      },
      {
        heading: "The cost of what remains unacknowledged",
        body: `Emotions influence our perceptions, decisions, and relationships, even when we are not fully conscious of them.

When we repeatedly dismiss our own hurt, we may become less aware of our boundaries. When we avoid acknowledging disappointment, we may continue investing in situations that consistently leave us unfulfilled. When we suppress anger without examining what it signals, we may struggle to recognise when something needs to change.

Not every emotion contains a clear message, and not every feeling requires action. Emotions can be shaped by assumptions, past experiences, and interpretations that deserve examination.

Yet, ignoring an emotion altogether prevents us from understanding what may be contributing to it.

We do not have to obey every feeling. But we benefit from becoming curious about it.

What has unsettled us? What expectation has gone unmet? What boundary may have been crossed? What meaning have we attached to this experience? Is the intensity of our response connected only to the present moment, or does it remind us of something unresolved?

These questions allow us to respond with greater understanding rather than remaining caught in automatic reactions.`,
      },
      {
        heading: "Healing begins with acknowledgement",
        body: `Healing does not require us to revisit every painful experience at once or to force ourselves to feel what we are not ready to face.

It begins with the willingness to stop treating our inner experiences as inconveniences that must always be overcome.

We can acknowledge sadness without judging ourselves as weak. We can recognise anger without allowing it to dictate our behaviour. We can admit disappointment without turning it into a conclusion about our worth.

Sometimes, processing an emotion means expressing it honestly. At other times, it may mean grieving what cannot be changed, reconsidering an expectation, setting a boundary, having a difficult conversation, or seeking professional support.

The process is not always immediate, and understanding an emotion does not guarantee that it will disappear. But acknowledging what we feel gives us an opportunity to understand our responses and make more deliberate choices.

We begin to move from asking, *"How do I make this feeling go away?"* to asking, *"What is happening within me, and how can I respond to it in a way that serves me?"*

That shift can change the relationship we have with our emotional world.`,
      },
      {
        heading: "From suppression to self-awareness",
        body: `The aim is not to live at the mercy of our emotions. Nor is it to analyse every feeling until life becomes an endless exercise in self-examination.

It is to develop the capacity to feel without being overwhelmed, reflect without becoming consumed, and respond without allowing every emotional impulse to take control.

When we become more familiar with our emotions, we can recognise our triggers earlier, communicate our needs more clearly, and distinguish between a feeling that deserves acknowledgement and a reaction that requires reconsideration.

We also begin to understand that emotional strength is not measured by how little we feel or how well we conceal our pain.

Sometimes, strength is the willingness to acknowledge what hurts, take responsibility for how we respond, and make the changes that our awareness calls for.

We may not have chosen the experiences that shaped our emotional patterns. But with awareness, support, and practice, we can begin to change how those patterns shape our lives.

> What we process can become a source of understanding. What we continually suppress may remain a pattern waiting to be recognised.`,
      },
    ],
    reflection: {
      title: "A Reflection to Carry With You",
      intro: "Think of an emotion you often dismiss, minimise, or avoid expressing.",
      questions: [
        "Which emotions do you find most difficult to acknowledge?",
        "What did you learn about expressing these emotions while growing up or through past relationships?",
        "When you suppress an emotion, how does it tend to show up later in your thoughts, behaviour, or relationships?",
        "What might the emotion be drawing your attention to: an unmet need, an expectation, a loss, or a boundary?",
        "What would acknowledging this emotion look like without allowing it to dictate your actions?",
      ],
      outro: [
        "You do not need to resolve everything you feel in one sitting. Begin by noticing what arises, meeting it with honesty, and giving yourself permission to understand it before deciding what to do with it.",
      ],
    },
  },

  // ───────────────────────────── Journal 5 ─────────────────────────────
  {
    slug: "the-courage-to-look-within",
    category: "inner-alchemy",
    title: "The Courage to Look Within",
    subtitle: "The hardest truths to confront are often the ones that bring us closest to ourselves.",
    excerpt: "Transformation begins when we turn our attention inward, with honesty and compassion.",
    date: "2026-10-22",
    readTime: "10 min read",
    pullQuote: "True transformation begins the moment we choose honesty over comfort.",
    layout: "inline",
    images: {
      hero: `${IMG}/courage-hero.jpg`,
      card: `${IMG}/card-courage.jpg`,
      reflection: `${IMG}/courage-reflection.jpg`,
    },
    inlineImages: [
      {
        src: `${IMG}/courage-inline.jpg`,
        alt: "An open journal on a stone window ledge at sunset",
        caption: "The journey inward is not always easy, but it is always worth it.",
        section: "intro",
      },
    ],
    intro: `It is often easier to examine what is wrong with the world around us than to question what is happening within us. We can identify other people's shortcomings, explain our disappointments through circumstances, and recognise the behaviours that have hurt us. Yet, turning that same honesty towards ourselves can feel considerably more difficult.

Looking inward asks something of us that looking outward does not. It asks us to question the beliefs we have defended, acknowledge the patterns we have repeated, and consider the possibility that some of what limits us may be sustained by our own interpretations, choices, or fears.

> Self-awareness is not simply the ability to understand ourselves. It is the willingness to see ourselves honestly, even when what we discover challenges the person we believe ourselves to be.`,
    sections: [
      {
        heading: "The comfort of looking outward",
        body: `When something goes wrong, our minds naturally search for an explanation. We look at the circumstances, the people involved, and the events that led us to that moment.

Often, these explanations are valid. We do experience unfairness, disappointment, betrayal, and circumstances beyond our control. Looking inward does not mean denying the impact of what others have done or accepting responsibility for what was never ours to carry.

But there is a difference between recognising how others have affected us and allowing their behaviour to become the only explanation for our experience.

We may repeatedly find ourselves in conflict without examining how we respond when we feel misunderstood. We may feel unappreciated without questioning whether we communicate our needs. We may resent others for crossing boundaries we have never clearly expressed.

These possibilities can be uncomfortable to consider because they move us beyond the familiar position of explaining what happened and towards the more demanding work of understanding our own role in what happens next.

The purpose is not to assign blame. It is to discover where greater awareness can give us greater choice.`,
      },
      {
        heading: "The parts of ourselves we avoid",
        body: `We all carry aspects of ourselves that are easier to defend than to examine.

We may call our fear of rejection love, our need for control responsibility, or our avoidance of difficult conversations peace. We may justify resentment as strength, people-pleasing as kindness, or emotional withdrawal as independence.

Sometimes, the explanations we give ourselves protect us from having to confront what lies beneath our behaviour.

Recognising these patterns does not mean that every motive is hidden or that every behaviour has a deeper psychological explanation. It means becoming curious about the difference between how we understand ourselves and how we actually respond in our lives.

Why do certain situations provoke such intense reactions? Why do we continue repeating behaviours we know are not serving us? Why do we defend beliefs that repeatedly leave us feeling trapped, disconnected, or dissatisfied?

The answers may reveal fears we have not acknowledged, needs we have struggled to express, or beliefs we have accepted without questioning.

> What we refuse to examine often continues to influence us without our conscious permission.`,
      },
      {
        heading: "When self-awareness becomes uncomfortable",
        body: `Genuine self-awareness is not always reassuring.

It may reveal that we have mistaken familiarity for compatibility, avoidance for acceptance, or emotional intensity for connection. It may show us that we have been waiting for someone else to change while avoiding a decision that belongs to us.

It may also require us to grieve the time we have spent repeating a pattern, acknowledge the consequences of our choices, or accept that understanding why we behave a certain way does not remove our responsibility to change it.

This is where many of us begin to resist the process.

We may intellectualise our experiences, explain our behaviour through our past, or use our understanding of ourselves to justify what we are unwilling to confront.

But understanding the origins of a pattern and taking responsibility for its impact are not mutually exclusive.

Our experiences may help explain why we developed certain responses. They do not necessarily mean those responses must continue to define us.

We can extend compassion to the person we were while accepting responsibility for the person we are becoming.`,
      },
      {
        heading: "The courage to take responsibility",
        body: `Responsibility is often mistaken for blame. Yet, the two serve very different purposes.

Blame asks who is at fault. Responsibility asks what can be understood, acknowledged, or changed.

We may not have chosen the experiences that shaped our beliefs. We may not have been responsible for the ways others treated us. But as we become aware of how those experiences influence our present behaviour, we gain an opportunity to respond differently.

We can learn to recognise our triggers without allowing them to dictate our reactions. We can acknowledge our insecurities without making others responsible for resolving them. We can admit when we have caused hurt without reducing our entire identity to a mistake.

Taking responsibility does not mean assuming that everything is within our control. It means identifying what is within our influence and being willing to act where we can.

This is where self-awareness begins to become agency.

Instead of waiting for every circumstance to change, we begin asking what we can do differently. Instead of repeatedly seeking explanations for our discomfort, we begin exploring what that discomfort may be asking us to acknowledge.

The shift is subtle but significant: we move from being only observers of our lives to becoming active participants in shaping how we live them.`,
      },
      {
        heading: "Inner-Alchemy: transforming awareness into change",
        body: `Inner-Alchemy begins with the recognition that transformation requires more than wanting a different life. It requires us to examine the inner patterns through which we experience the life we have.

It asks us to question the beliefs we have mistaken for truths, recognise the emotional responses that have become automatic, and reconsider the meanings we attach to our experiences.

This process is neither instant nor linear. Awareness may come in moments, while changing deeply ingrained responses requires patience, practice, and sometimes support.

There will be times when we recognise a pattern only after repeating it. There will be moments when we understand what needs to change but struggle to act on that understanding.

These moments do not make transformation impossible. They remind us that insight is the beginning of the work, not its completion.

We can start with a pause before reacting, a difficult truth we finally acknowledge, a boundary we choose to establish, or a belief we become willing to question.

Each conscious choice creates an opportunity to respond with greater intention rather than simply repeating what feels familiar.

> The purpose of looking within is not to find fault with ourselves. It is to understand ourselves well enough to stop living unconsciously through patterns we have the capacity to change.`,
      },
      {
        heading: "Becoming more honest with ourselves",
        body: `Perhaps the most meaningful question we can ask is not whether we are right or wrong, strong or weak, healed or broken.

It is whether we are willing to see ourselves beyond the stories that protect our existing sense of identity.

Can we acknowledge our fears without allowing them to make every decision? Can we recognise our limitations without turning them into permanent definitions of who we are? Can we accept that we may have misunderstood a situation, contributed to a difficulty, or outgrown a belief we once held firmly?

The courage to look within is not about becoming relentlessly critical of ourselves. It is about developing the honesty to recognise what is true, the compassion to understand how we arrived here, and the responsibility to decide what comes next.

We cannot change everything that has shaped us. But we can become more conscious of how we carry it forward.

And perhaps this is where the real transformation begins: not in becoming someone entirely different, but in becoming more aware of the person we have been, the person we are, and the choices available to us now.

> The journey inward requires the courage to see ourselves clearly, the humility to question what we believe, and the willingness to change what no longer serves us.`,
      },
    ],
    reflection: {
      title: "A Reflection to Carry With You",
      intro: "Take a moment to consider an area of your life where you feel stuck, frustrated, or repeatedly disappointed.",
      questions: [
        "What explanation do you usually give yourself for why this keeps happening?",
        "Is there a belief, fear, or habitual response within your influence that you have been reluctant to examine?",
        "What might you discover if you approached yourself with honesty rather than defensiveness?",
        "What can you take responsibility for without blaming yourself for everything that happened?",
        "What is one conscious choice you could make to begin responding differently?",
      ],
      outro: [
        "You do not need to judge what you discover or change everything at once. Begin with the willingness to see clearly.",
        "Sometimes, the most courageous step forward is the decision to stop looking away.",
      ],
    },
  },

  // ───────────────────────────── Journal 6 ─────────────────────────────
  {
    slug: "from-reaction-to-choice",
    category: "relationships",
    title: "From Reaction to Choice",
    subtitle: "The quality of our relationships is shaped not only by what we feel, but by how consciously we choose to respond.",
    excerpt: "How greater self-awareness can change the way we relate to ourselves and others.",
    date: "2026-10-25",
    readTime: "10 min read",
    pullQuote: "Between what happens and how we respond, there is an opportunity to pause, reflect, and choose.",
    layout: "feature",
    images: {
      hero: `${IMG}/reaction-hero.jpg`,
      card: `${IMG}/card-reaction.jpg`,
      feature: `${IMG}/reaction-feature.jpg`,
      side: `${IMG}/reaction-side.jpg`,
      reflection: `${IMG}/reaction-reflection.jpg`,
    },
    sideQuote: "A conscious response creates space for deeper understanding, stronger boundaries and more meaningful connections.",
    intro: `Relationships have a way of bringing us face to face with parts of ourselves we might otherwise overlook. A delayed response, a disagreement, a perceived rejection, or an unmet expectation can stir emotions that feel far greater than the moment itself.

We may react defensively when we feel misunderstood, withdraw when we fear rejection, or become controlling when uncertainty makes us uncomfortable. In these moments, our responses can feel automatic, as though the other person's behaviour has determined what we must feel and how we must act.

Yet, between what happens and how we respond, there is an opportunity to pause, reflect, and choose.

> Emotional maturity begins when we stop allowing every feeling to dictate our behaviour.`,
    sections: [
      {
        heading: "When emotions take the lead",
        body: `Our emotional reactions are often shaped by more than the immediate situation. Past experiences, deeply held beliefs, unmet needs, and familiar fears can influence how we interpret what another person says or does.

When we have experienced rejection, we may perceive distance as abandonment. When we have felt unheard, we may interpret disagreement as dismissal. When trust has been broken, we may approach uncertainty with suspicion, even when the present circumstances are different.

The emotion we experience is real, but the interpretation accompanying it may not tell the whole story.

We may respond to an assumption as though it were a fact, defend ourselves against an intention the other person never had, or withdraw from a conversation because it reminds us of an earlier hurt.

What begins as a present interaction can quickly become a reaction to accumulated experiences.

Recognising this does not mean dismissing our feelings or assuming that our concerns are unfounded. It means becoming curious about what belongs to the present situation and what may be influenced by our own history.`,
      },
      {
        heading: "The difference between reacting and responding",
        body: `A reaction is often immediate. It emerges before we have fully considered what has happened, what it means, or what our response might create.

A response allows room for awareness.

When we react, we may raise our voice to be heard, remain silent to avoid conflict, or say something hurtful because we feel hurt ourselves. We may seek reassurance through repeated questioning or create distance to protect ourselves from the possibility of rejection.

These behaviours may provide temporary relief, but they can also deepen the very disconnection we are trying to resolve.

Responding differently requires us to recognise the emotion without immediately acting on its impulse.

We can acknowledge anger without becoming cruel. We can express disappointment without turning it into accusation. We can ask for reassurance without demanding that another person eliminate every uncertainty we feel.

The goal is not to suppress our emotional responses or become endlessly accommodating. It is to choose behaviour that reflects our values rather than simply reproducing our immediate emotional state.

> We may not always choose what we feel, but we can learn to become more conscious of what we do with those feelings.`,
      },
      {
        heading: "The stories we bring into our relationships",
        body: `Every relationship involves two people with different histories, assumptions, expectations, and ways of interpreting the world.

A disagreement that feels like an ordinary difference of opinion to one person may feel like rejection to another. A need for space may be interpreted as indifference. An attempt to offer advice may be experienced as criticism.

The difficulty often arises when we assume that our interpretation is the only possible explanation.

We may conclude that someone does not care because they respond differently from how we would. We may interpret a mistake as evidence of a lack of respect, or treat an unmet expectation as proof that the relationship is not important to the other person.

Sometimes, our interpretations are accurate and point towards genuine problems that need to be addressed. At other times, they reflect assumptions shaped by our own experiences, fears, or expectations.

The distinction matters because we tend to respond not only to another person's behaviour, but also to the meaning we assign to it.

Before reacting, we can ask ourselves: What actually happened? What am I assuming about the other person's intentions? Have I communicated what I need, or am I expecting them to know? Is this concern part of a repeated pattern, or am I drawing a conclusion from a single moment?

These questions do not guarantee that we will avoid misunderstandings. They give us a better chance of addressing them without creating additional hurt.`,
      },
      {
        heading: "Responsibility without self-abandonment",
        body: `Learning to respond consciously does not mean taking responsibility for every conflict or making ourselves accountable for another person's behaviour.

Healthy relationships require mutual effort, honesty, respect, and accountability. We cannot create emotional safety alone when the other person is unwilling to participate.

There are situations in which the appropriate response is a clear boundary, a difficult decision, or distance from a harmful relationship.

The work of self-awareness is not to teach us to tolerate what hurts us. It is to help us distinguish between responding thoughtfully and reacting automatically, between accepting our part and carrying what belongs to someone else.

We can acknowledge where our defensiveness has contributed to conflict while recognising that another person's disrespect remains their responsibility. We can examine our fear of abandonment without convincing ourselves to remain where we are consistently mistreated.

Taking responsibility for our responses should strengthen our sense of agency, not diminish our right to be treated with dignity.

> The aim is not to become easier for everyone else to deal with. It is to become more conscious of how we relate, what we accept, and what we choose.`,
      },
      {
        heading: "The courage to pause",
        body: `The pause between an emotional trigger and our response may be brief, but it can change the direction of an interaction.

It gives us a moment to recognise what we are feeling, question the interpretation driving our reaction, and consider what we actually want to achieve.

Do we want to be understood, or do we want to prove that we are right? Are we trying to resolve the disagreement, or are we trying to make the other person feel the hurt we feel? Are we expressing a need, or expecting someone to discover it through our silence?

These questions help us recognise when our immediate impulse may be taking us further away from what matters.

Sometimes, the conscious choice is to continue the conversation with greater honesty. Sometimes, it is to step away until we can speak without causing unnecessary harm. At other times, it is to listen, apologise, clarify a misunderstanding, or establish a boundary.

There is no single response that fits every situation. The difference lies in choosing with awareness rather than allowing an unexamined impulse to choose for us.`,
      },
      {
        heading: "From reaction to connection",
        body: `The quality of a relationship is not measured by the absence of conflict. Differences, disappointments, and misunderstandings are inevitable when two individuals share their lives.

What matters is how those moments are handled.

Can we disagree without humiliating one another? Can we express hurt without using it as a weapon? Can we listen without preparing our defence? Can we acknowledge our mistakes without treating accountability as a threat to our worth?

These capacities do not eliminate difficult emotions. They allow us to navigate them with greater care.

When we learn to pause before reacting, we create room for communication rather than escalation. When we question our assumptions, we become more open to understanding. When we express our needs clearly and respect our boundaries, we give our relationships a better chance of becoming honest and reciprocal.

And when a relationship repeatedly fails to offer respect or safety despite our efforts, conscious choice may mean recognising that we cannot change another person and deciding what is right for us.

Not every relationship can be repaired. Not every disagreement can be resolved. But we can become more intentional about the part we play in the relationships we choose to build and maintain.`,
      },
      {
        heading: "The relationship we have with ourselves",
        body: `Ultimately, the way we respond to others is closely connected to the way we understand ourselves.

When our worth depends heavily on approval, disagreement may feel threatening. When we struggle to acknowledge our needs, resentment may replace communication. When we fear being alone, we may abandon our boundaries to preserve a relationship.

Developing self-awareness helps us recognise these patterns without judging ourselves for having them.

We begin to understand that another person's disappointment does not automatically mean we have done something wrong, that conflict does not always signify rejection, and that maintaining a relationship should not require us to abandon our own values.

We can care deeply without controlling. We can remain open without ignoring our boundaries. We can love someone while acknowledging that their choices are not ours to manage.

This is not emotional detachment. It is the development of a more grounded way of relating, one in which connection does not require the loss of self.

> The shift from reaction to choice begins when we learn to hold our emotions with awareness rather than allowing them to hold our relationships hostage.`,
      },
    ],
    reflection: {
      title: "A Reflection to Carry With You",
      intro: "Think of a recent interaction in which your emotional response felt difficult to manage.",
      questions: [
        "What happened, and what did you immediately make it mean?",
        "What emotion did you experience, and what might have triggered it?",
        "Did your response reflect what you wanted to communicate, or did it emerge from an impulse to protect yourself?",
        "What could you do differently next time while still honouring your feelings and boundaries?",
        "What would a response guided by self-respect, clarity, and awareness look like?",
      ],
      outro: [
        "You do not need to get every interaction right. Begin by noticing the moment when an automatic reaction becomes a conscious choice.",
        "Sometimes, a relationship changes not because the other person changes first, but because we learn to respond differently. And sometimes, that change helps us recognise what we can repair, what we must communicate, and what we may need to release.",
      ],
    },
  },
];

// ─── Helpers ───
export function getArticle(slug) {
  return ARTICLES.find((a) => a.slug === slug) || null;
}

/** Journal order (as in the design) */
export function getArticles() {
  return ARTICLES;
}

/** Previous / next article for the bottom navigation */
export function getAdjacent(slug) {
  const i = ARTICLES.findIndex((a) => a.slug === slug);
  return { prev: ARTICLES[i - 1] || null, next: ARTICLES[i + 1] || null };
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

export function sectionId(heading) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
