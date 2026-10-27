"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
// Full testimonials. Cards show a short preview; "Read more" opens the full text.
// Use a blank line ("\n\n") inside `text` to start a new paragraph.
export const testimonials = [
  {
    id: "haseeb",
    name: "Haseeb Ali",
    age: 35,
    country: "Italy",
    type: "Individual therapy client",
    text: "It’s been an absolutely life-changing experience to have Dr. Syma as my therapist for the last three years. During my life-changing decisions and anxiety, Dr. Syma always found a way to understand the deeper problems and help me find a solution. I always felt a sense of clarity and confidence after speaking to her. For anyone who is looking for professional help, it’s hard to find a professional like Dr. Syma Hamid. Highly recommended.",
  },
  {
    id: "sundus",
    name: "Sundus W.",
    age: 32,
    country: "Pakistan",
    type: "Individual therapy client",
    text: "When I started therapy, I couldn’t see a way through my own patterns. Working with her changed that. She doesn’t just listen; she challenges my perspective in a way that helps me actually see myself more clearly. Session by session, Dr. Syma has helped me set boundaries I didn’t know I was allowed to have. I feel more like myself than I have in a long time.",
  },
  {
    id: "efj",
    name: "EFJ",
    age: 24,
    country: "France",
    type: "Individual therapy client",
    text: "I once listened to Dr. Syma say that faith cannot be explained, it can only be experienced by each individual subjectively. Similarly, my experience with her in these past 7 years cannot be simply put into words. Her words and presence have taken many forms for me at various stages of my life; she has been a guide, a mentor, an unexplainable paradoxical spiritual presence, and a therapist all in one. She has led me to have the courage to see and acknowledge the truth in me and in everything that surrounds me. I don’t know the person I would’ve been, had I never been introduced to her, but the person I am today is greatly due to her.",
  },
  {
    id: "leena",
    name: "Leena A.",
    age: 52,
    country: "Canada",
    type: "Individual therapy client",
    text: "I have experienced therapy with Dr. Syma as something quite different from traditional therapy. She has a rare ability to ask the questions that you may not always want to hear but perhaps need to ask yourself. Her approach is direct, unconventional and deeply insightful, yet always leaves the space for you to discover your own answers rather than being told what to think or do. What I particularly value is the depth she brings to her work. Dr. Syma’s understanding of spirituality, human nature and the wisdom of traditions adds another dimension to the therapeutic process. Some of the questions she has asked me have stayed with me long after our conversations and have made me look at myself, my choices and my patterns in ways I hadn’t before.\n\nDr. Syma doesn’t simply help you feel better in the moment. She challenges you to understand yourself more honestly. For me, that has been both uncomfortable at times and incredibly valuable.",
  },
  {
    id: "fatima",
    name: "Fatima A.",
    age: 24,
    country: "Pakistan",
    type: "Individual therapy client",
    text: "I’ve had a truly wonderful experience with Dr. Syma. She made me feel so comfortable, heard and understood, and I really value her empathy. After every session, I felt lighter, as if a knot had been untangled, with a better understanding of myself and life. I’m truly grateful for the safe space and positive impact she has created for me.",
  },
  {
    id: "nm",
    name: "N.M.",
    age: 42,
    country: "Finland",
    type: "Individual therapy client",
    text: "Dr. Syma has helped me through one of the darkest and most painful periods of my life after my divorce. What makes her exceptional is the balance she brings. She is deeply compassionate and empathetic, yet also direct, pragmatic, and honest when you need to hear it, even when it is difficult. Her words and insights continue to stay with me, and with her guidance, I continue to move forward and heal. I am deeply grateful to have her support as I find my way forward in life with more clarity, strength, and hope.",
  },
  {
    id: "zakia",
    name: "Zakia Abbasi",
    age: 55,
    country: "Pakistan",
    type: "Individual therapy client",
    text: "I first met Dr. Syma Hamid online on 7th November 2024. Today is 11th September 2026. When I look back at the Zakia who sat in that first consultation, I sometimes find it difficult to recognize her. And if someone asks me who I am today, my answer may still be: “I don’t know”. But one thing I can say with certainty is that I am not who I was then.\n\nMy journey with Dr. Syma has been one of the most important, beautiful, and difficult periods of my life. It has meant looking again at my relationships, my patterns, the stories I had lived by, and beliefs about myself that I had carried for years. Sometimes I found answers. Sometimes old answers fell apart. And sometimes I learned that a question does not need to be answered immediately.\n\nOne of the things I value most about Dr. Syma is that she never stopped me from living my own life. Whenever curiosity arose in me, when I wanted to explore, experience or do something, instead of imposing her answers on me, she would often simply say “Go see”. “Let’s see”. And I did. Sometimes I found an answer, sometimes pain, sometimes laughter, and sometimes another question. But whatever I found came through my own experience. Being given the freedom to experience life and discover my own answers has been one of the most beautiful parts of therapy for me.\n\nSomewhere in that process, I began to see myself too, as a person whose own voice, desires, “no”, confusion, and curiosity also matter. And the journey has taken me far enough that today I can even question the “I” I thought I had finally found. I still do not have all the answers. Perhaps the difference now is that I no longer need to. Dr. Syma did not tell me who I should become. She created a space in which I could begin to see for myself. For me, that has been one of the greatest gifts of therapy.\n\nI do not want my name hidden from this testimonial. Therapy, vulnerability, confusion, asking for help, and discovering myself are not things I feel the need to hide. My mother used to say, “Keep lighting one lamp from another”. If even a little light from my journey helps one person find the courage to seek help, ask a question, or begin their own journey, that is enough for me.",
  },
  {
    id: "dania",
    name: "Dr. Dania D.",
    age: 32,
    country: "Saudi Arabia",
    type: "Individual therapy client",
    text: "I was 26 when I had my first acquaintance with Dr. Syma; at that time I was in complete unrest. My mother wasn’t well, I was in a relationship which served me nothing except guilt and disgrace, and there was a lot of chaos within me. She made me self-reflect instead of mirror. Through a series of uncomfortable talks and a lot of tears, I was actually able to experience what we call being accountable. Because of Dr. Syma I learnt how to let go and give myself grace. Today I am 32 years old, still struggling, but now I know how to navigate in a far better way. The #1 lesson is still my favorite: feeling, faith, facts. Dr. Syma told me to prioritise the order; only then can you lead with dignity. The actual order of this is facts, feelings, faith. It takes actual courage to reach here. Forever grateful and indebted.",
  },
  {
    id: "ay",
    name: "Dr. A.Y.",
    age: 36,
    country: "USA",
    type: "Individual therapy client",
    text: "I first started seeing Dr. Syma in 2021, after a difficult divorce left me struggling with depression and anxiety. Reaching out to her was truly one of the best decisions I’ve ever made for myself. Dr. Syma is compassionate, patient, and attentive. She listens without judgment and has a remarkable way of helping you navigate difficult situations while making you feel genuinely heard and understood. With her guidance, I was able to overcome challenges that once felt impossible and develop a healthier perspective on my mental health. She completely changed the way I view therapy and made me a strong believer in the importance of mental health care. Even today, she is the first person I turn to when I feel stuck and the first person I recommend to any friend or loved one who is struggling. I cannot recommend Dr. Syma highly enough, and I’m incredibly grateful for the lasting impact she has had on my life.",
  },
  {
    id: "areeba",
    name: "Areeba W.",
    age: 36,
    country: "Singapore",
    type: "Individual therapy client",
    text: "I’d highly recommend Dr. Syma Hamid. She has helped me through several crucial moments in my life and has always been able to get to the root of what was going on. She’s practical, no-nonsense and very good at giving you the reality check you need and pushing you when needed. I’ve genuinely found her approach incredibly helpful.",
  },
  {
    id: "ayesha",
    name: "Ayesha Batool",
    age: 32,
    country: "UAE",
    type: "Individual therapy client",
    text: "I’ve been seeing Dr. Syma Hamid for the past three years, and therapy with her has been one of the best investments I’ve made in my mental health. She’s approachable, easy to talk to, and deeply supportive, while also helping you face difficult realities with honesty and compassion. She’s not the kind of therapist who will endlessly dig into your childhood traumas; her approach is very solution-oriented and action-focused, which has helped me better understand myself, handle challenging situations, and gain clarity. I’m in a much better place than when I started, and I am genuinely grateful to have her as my therapist.",
  },
  {
    id: "noreen",
    name: "Noreen J.",
    age: 43,
    country: "Pakistan",
    type: "Individual therapy client",
    text: "Among many blessings bestowed upon me by Allah, Dr. Syma is one of the special blessings in my life. It is nothing less than an honor for me to have had an opportunity to say something about my experience with her. I do not believe my words carry the capacity to justify what I wish to say. During my 10-year journey with Dr. Syma, I have been able to face and handle some of the most difficult and challenging times amicably. Through sessions with Dr. Syma, I have developed and learnt acceptance, understanding, self-determination, self-realization, self-respect, self-reliance, courage and the ability to make decisions.\n\nSessions with her have helped me to meet myself anew; my perspective and understanding of myself, and most importantly recognizing my true self, has been a life-transforming experience for me. These new insights have helped me understand those around me much more effectively. As a result of my sessions with Dr. Syma, I find myself better equipped to handle, manage, and deal with my relationships, which has improved the quality of all my relationships. But most importantly, I learnt and found the courage to take a deep dive within myself and was able to kindle the light within to face my shadows, which led me to unbelievably transform my relationship with my God.\n\nFor me, at times she was my teacher, sometimes a friend, and at times a mentor, who is like a light for me in the darkest hours. I believe Dr. Syma is a healing touch for a wounded soul. As Shams Tabrizi was a light in Rumi’s life, for me Dr. Syma is my Shams, and as Shams said: ‘There are more fake guides, teachers in the world than stars. The real guide is the one who makes you see your inner beauty, not the one who wants to be admired and followed.’",
  },
  {
    id: "latif",
    name: "F. Latif",
    age: 56,
    country: "USA",
    type: "Individual therapy client",
    text: "Dr. Syma has been such a help. She is a fantastic listener but isn’t someone who coddles you. She has helped me break down my thought process and see where I get my reactions and my feelings from. It has helped me see myself from another perspective and has helped me become more rational with the way I approach situations. I cannot recommend her enough.",
  },
  {
    id: "rf",
    name: "Dr. R.F.",
    age: 34,
    country: "USA",
    type: "Individual therapy client",
    text: "Dr. Hamid has been an excellent therapist, supporter, and friend. She is readily available and makes scheduling appointments incredibly easy. She is kind and warm, while also providing the tough love and honest guidance you sometimes need. It is clear that she has the training and experience to practice modern psychology while remaining thoughtful and respectful of traditional Islamic values and practices. I am incredibly grateful for her support, guidance, and advice.",
  },
];

const PREVIEW_CHARS = 260; // show "Read full story" when the text is longer than this

const meta = (t) => [t.age && `${t.age}`, t.country].filter(Boolean).join(", ");

function QuoteMark({ className = "" }) {
  return (
    <Image
      src="/images/testimonials/Vector.svg"
      alt=""
      width={85}
      height={62}
      className={`h-auto w-8 ${className}`}
    />
  );
}

function Author({ t }) {
  return (
    <div>
      <div className="mb-3 h-0.5 w-16 bg-[#A67539]" />
      <p className="font-cormorant text-lg font-semibold leading-tight text-[#223329]">
        {t.name}
        <span className="ml-2 font-avenir text-xs font-normal text-[#223329]/60">{meta(t)}</span>
      </p>
      <span className="mt-1 block font-avenir text-[10px] font-medium uppercase tracking-[0.15em] text-[#223329]/60">
        {t.type}
      </span>
    </div>
  );
}

export default function TestimonialCarousel() {
  const [active, setActive] = useState(null);

  return (
    <>
      <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full px-5 sm:px-6">
        <CarouselContent className="-ml-6 py-4">
          {testimonials.map((t) => {
            const isLong = t.text.length > PREVIEW_CHARS;
            return (
              <CarouselItem key={t.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <figure className="flex h-full flex-col rounded-3xl border border-white/50 bg-[#FAF7F2]/90 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md sm:p-7">
                  <QuoteMark className="mb-4" />

                  {/* Same number of lines on every card keeps heights equal */}
                  <blockquote className="line-clamp-6 whitespace-pre-line font-avenir text-sm leading-relaxed text-[#223329]/90">
                    {t.text}
                  </blockquote>

                  {isLong && (
                    <button
                      type="button"
                      onClick={() => setActive(t)}
                      className="mt-2 w-fit font-avenir text-xs font-medium text-[#A67539] underline-offset-4 hover:underline"
                    >
                      Read full story
                    </button>
                  )}

                  <figcaption className="mt-auto pt-6">
                    <Author t={t} />
                  </figcaption>
                </figure>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-0 border-white/60 bg-[#FAF7F2]/90 text-[#223329] shadow-md hover:bg-white sm:-left-1" />
        <CarouselNext className="right-0 border-white/60 bg-[#FAF7F2]/90 text-[#223329] shadow-md hover:bg-white sm:-right-1" />
      </Carousel>

      {/* Full testimonial */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-3xl border-[#E5DFD5] bg-[#FAF7F2] p-7 sm:max-w-2xl sm:p-10">
          {active && (
            <>
              <QuoteMark />
              <DialogTitle className="sr-only">Testimonial from {active.name}</DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-4 font-avenir text-[15px] leading-7 text-[#223329]/90">
                  {active.text.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </DialogDescription>
              <div className="mt-2">
                <Author t={active} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}