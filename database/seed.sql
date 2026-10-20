-- Starting data: admin user (syma-hamid) + assessments.
-- Import AFTER schema.sql. Prefer 'npm run db:setup' which does both automatically.
SET NAMES utf8mb4;


INSERT INTO `admins` (`id`, `username`, `password_hash`, `last_login_at`, `created_at`) VALUES (1,'syma-hamid','$2b$12$fNQsNDJNv/lQthKJe0m25e2d4DNdk0YJR.MKISxWEPpwJkfcLxXoC',NULL,'2026-10-20 12:34:45');

INSERT INTO `assessments` (`id`, `slug`, `title`, `description`, `intro_text`, `image`, `duration`, `closing_title`, `closing_text`, `final_reflection`, `is_published`, `sort_order`, `created_at`, `updated_at`) VALUES (1,'relationship-hurt','What Is Really Hurting You in Your Relationships?','Discover the emotional patterns beneath relationship pain.',NULL,'/images/assessment/assessment-1.png','5 Minutes',NULL,NULL,NULL,1,1,'2026-10-20 12:34:45','2026-10-20 12:34:45');
INSERT INTO `assessments` (`id`, `slug`, `title`, `description`, `intro_text`, `image`, `duration`, `closing_title`, `closing_text`, `final_reflection`, `is_published`, `sort_order`, `created_at`, `updated_at`) VALUES (2,'grief','What Kind of Grief Are You Carrying?','Explore the losses that may still be asking for peace.',NULL,'/images/assessment/assessment-2.png','3 Minutes',NULL,NULL,NULL,1,2,'2026-10-20 12:34:45','2026-10-20 12:34:45');
INSERT INTO `assessments` (`id`, `slug`, `title`, `description`, `intro_text`, `image`, `duration`, `closing_title`, `closing_text`, `final_reflection`, `is_published`, `sort_order`, `created_at`, `updated_at`) VALUES (3,'losing-yourself','Are You Losing Yourself in Your Relationship?','Notice where connection may be coming at the cost of self.',NULL,'/images/assessment/assessment-3.png','3 Minutes',NULL,NULL,NULL,1,3,'2026-10-20 12:34:45','2026-10-20 12:34:45');
INSERT INTO `assessments` (`id`, `slug`, `title`, `description`, `intro_text`, `image`, `duration`, `closing_title`, `closing_text`, `final_reflection`, `is_published`, `sort_order`, `created_at`, `updated_at`) VALUES (4,'respond-when-hurt','How Do You Respond When You Feel Hurt?','Understand your instinctive response to emotional pain.',NULL,'/images/assessment/assessment-4.png','3 Minutes',NULL,NULL,NULL,1,4,'2026-10-20 12:34:45','2026-10-20 12:34:45');
INSERT INTO `assessments` (`id`, `slug`, `title`, `description`, `intro_text`, `image`, `duration`, `closing_title`, `closing_text`, `final_reflection`, `is_published`, `sort_order`, `created_at`, `updated_at`) VALUES (5,'ready-for-change','Are You Ready for Change?','Explore where you are in your readiness for personal change.',NULL,'/images/assessment/assessment-5.png','3 Minutes',NULL,NULL,NULL,1,5,'2026-10-20 12:34:45','2026-10-20 12:34:45');
INSERT INTO `assessments` (`id`, `slug`, `title`, `description`, `intro_text`, `image`, `duration`, `closing_title`, `closing_text`, `final_reflection`, `is_published`, `sort_order`, `created_at`, `updated_at`) VALUES (6,'identify-your-pattern','Identify Your Pattern','Recognize the thoughts, emotions and behaviors that may keep repeating.','What keeps repeating may be trying to tell you something. This reflection helps you notice the thoughts, emotions and behaviours that may sit beneath recurring experiences.','/images/assessment/assessment-6.png','5–7 Minutes','Your pattern is not your identity.','A pattern is something you have learned. It is not who you are.\n\nPatterns often develop for understandable reasons. They may once have helped you cope, protect yourself, maintain relationships or navigate difficult experiences.\n\nWhat has been learned can be understood, questioned and changed.','What keeps repeating in your life – and what might it be asking you to understand?',1,6,'2026-10-20 12:34:45','2026-10-20 12:34:45');

INSERT INTO `assessment_profiles` (`id`, `assessment_id`, `title`, `short_description`, `image`, `quote`, `core_insight`, `notices`, `pattern_steps`, `reflection`, `sort_order`) VALUES (1,6,'The Overthinker','Runs scenarios, seeks reassurance, struggles to let go.','/images/assessment/overthinker.png','You are not too much. You are just used to carrying more than you should','You may be trying to find certainty through understanding.','[\"Replaying conversations\",\"Searching for explanations\",\"Second-guessing yourself\",\"Difficulty leaving things unresolved\"]','[\"Trigger\",\"Questioning\",\"Overthinking\",\"Exhaustion\",\"More questioning\"]','What would happen if you didn\'t need to understand everything before allowing yourself to move forward?',1);
INSERT INTO `assessment_profiles` (`id`, `assessment_id`, `title`, `short_description`, `image`, `quote`, `core_insight`, `notices`, `pattern_steps`, `reflection`, `sort_order`) VALUES (2,6,'The Controller','Feels safer with structure, finds it hard to be vulnerable.','/images/assessment/controller.png','Strength is not holding everything together. Sometimes it is allowing yourself to be held.','You may be trying to find safety through control.','[\"Needing a plan for everything\",\"Finding it hard to delegate or rely on others\",\"Feeling anxious when things are uncertain\",\"Fixing problems before feeling them\"]','[\"Uncertainty\",\"Anxiety\",\"Taking control\",\"Tension\",\"More control\"]','What might you feel if you didn\'t have to hold everything together on your own?',2);
INSERT INTO `assessment_profiles` (`id`, `assessment_id`, `title`, `short_description`, `image`, `quote`, `core_insight`, `notices`, `pattern_steps`, `reflection`, `sort_order`) VALUES (3,6,'The Protector','Builds emotional walls, avoids getting hurt again.','/images/assessment/protector.png','The walls that kept you safe can also keep out what you most need.','You may be trying to stay safe through distance.','[\"Keeping feelings to yourself\",\"Pulling away when things feel close\",\"Preferring to cope alone\",\"Finding it hard to trust others fully\"]','[\"Hurt\",\"Withdrawal\",\"Isolation\",\"Loneliness\",\"More distance\"]','What would it take to feel safe enough to let someone a little closer?',3);
INSERT INTO `assessment_profiles` (`id`, `assessment_id`, `title`, `short_description`, `image`, `quote`, `core_insight`, `notices`, `pattern_steps`, `reflection`, `sort_order`) VALUES (4,6,'The Over-Adapter','Prioritizes others\' needs, loses sight of their own.','/images/assessment/adapter.png','Your needs are not a burden. They are a part of you that deserves care too.','You may be trying to stay connected by putting yourself last.','[\"Saying yes when you mean no\",\"Feeling responsible for others\' feelings\",\"Avoiding conflict at your own expense\",\"Losing touch with what you want\"]','[\"Tension\",\"Accommodating\",\"Self-neglect\",\"Resentment\",\"More accommodating\"]','What would change if your needs mattered as much as everyone else\'s?',4);

INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (1,6,'When something difficult happens, what do you do first?','choice',1);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (2,6,'When someone disappoints you, how do you usually respond?','choice',2);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (3,6,'When you feel misunderstood, what is your first instinct?','choice',3);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (4,6,'When a relationship feels uncertain, what do you tend to do?','choice',4);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (5,6,'When someone criticizes you, what feels most natural?','choice',5);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (6,6,'When you feel overwhelmed, how do you usually cope?','choice',6);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (7,6,'When you need support, what is hardest for you?','choice',7);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (8,6,'When conflict arises, what do you tend to prioritize?','choice',8);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (9,6,'When someone becomes distant, what do you usually assume?','choice',9);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (10,6,'When your needs conflict with someone else\'s, what do you do?','choice',10);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (11,6,'When you make a mistake, how do you typically react?','choice',11);
INSERT INTO `assessment_questions` (`id`, `assessment_id`, `question`, `type`, `sort_order`) VALUES (12,6,'When the same problem keeps repeating, what do you do?','choice',12);

INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (1,1,'Look for what I did wrong',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (2,1,'Try to regain control',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (3,1,'Pull away and process alone',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (4,1,'Focus on the other person\'s needs',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (5,2,'Question what I could have done differently',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (6,2,'Try to fix the situation immediately',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (7,2,'Withdraw and keep my feelings to myself',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (8,2,'Try to understand and reassure them',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (9,3,'Blame myself for not explaining clearly',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (10,3,'Explain my point until I feel understood',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (11,3,'Stop explaining and distance myself',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (12,3,'Focus on making the other person comfortable',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (13,4,'Wonder whether I am the problem',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (14,4,'Seek answers and reassurance',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (15,4,'Create distance to protect myself',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (16,4,'Try harder to keep the connection strong',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (17,5,'Take it personally and question myself',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (18,5,'Defend myself and explain my actions',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (19,5,'Shut down and avoid further discussion',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (20,5,'Agree to keep the situation peaceful',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (21,6,'Analyze what I should have done better',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (22,6,'Make a plan to regain control',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (23,6,'Withdraw until I can process everything',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (24,6,'Put other people\'s needs before my own',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (25,7,'Feeling like I am asking for too much',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (26,7,'Not knowing how to solve the problem myself',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (27,7,'Opening up about what I am feeling',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (28,7,'Worrying about burdening someone else',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (29,8,'Understanding what I did wrong',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (30,8,'Finding a solution as quickly as possible',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (31,8,'Getting space away from the tension',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (32,8,'Restoring harmony between everyone',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (33,9,'I must have done something wrong',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (34,9,'I need to find out what has changed',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (35,9,'I should distance myself too',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (36,9,'I should do more to reconnect',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (37,10,'Feel guilty for having needs of my own',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (38,10,'Try to negotiate an outcome that works',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (39,10,'Keep my needs private and step back',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (40,10,'Put their needs first to avoid tension',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (41,11,'Replay it and criticize myself',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (42,11,'Fix it immediately and regain control',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (43,11,'Avoid thinking about it for a while',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (44,11,'Worry about how it affected others',4,4);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (45,12,'Look inward for what I need to change',1,1);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (46,12,'Try a new strategy to change the outcome',2,2);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (47,12,'Pull back to protect my energy',3,3);
INSERT INTO `assessment_options` (`id`, `question_id`, `option_text`, `profile_id`, `sort_order`) VALUES (48,12,'Work harder to make things better for everyone',4,4);


