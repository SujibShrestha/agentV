"use client";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/Vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import soundwaves from "@/constants/soundwaves.json";
import { useEffect, useRef, useState } from "react";
import { set } from "zod";
import { addToSessionHistory } from "@/lib/actions/companion.actions";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setisSpeaking] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isMuted, setisMuted] = useState(false);
  const [messages, setmessages] = useState<SavedMessage[]>([]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const asssistantOverrides = {
      variableValues: {
        subject,
        topic,
        style,
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), asssistantOverrides);
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setisMuted(!isMuted);
  };

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) lottieRef.current?.play();
      else lottieRef.current?.stop();
    }
  }, []);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setmessages((prev) => [newMessage, ...prev]);
      }
    };

    const onError = (error: Error) => {
      console.log("Error");
    };
    const onSpeechStart = () => {
      setisSpeaking(true);
    };
    const onSpeechEnd = () => {
      setisSpeaking(false);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("error", onError);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("error", onError);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                `absolute transition-opacity duration-1000 `,
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.FINISHED ||
                  (callStatus === CallStatus.CONNECTING &&
                    "opactiy-100 animate-pulse")
              )}
            >
              <Image
                src={`/icons/${subject.toLowerCase()}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>
           
              <div
                className={cn(
                  "absolute transition-opacity duration-1000",
                  callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
                )}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoPlay={false}
                  className="companion-lottie"
                /> <div>
              </div>
            </div>
          </div>
          <p className="font-bold  text-2xl">{name}</p>
        </div>

        <div className=" user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={100}
              height={100}
              className="rounded-full"
            />

            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="Microphone"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn On MicroPhone" : "Turn Off MicroPhone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE
                ? "bg-red-600 hover:bg-red-700"
                : " bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : "Start Session"}
          </button>
        </div>
      </section>
      <section className="transcript">
        <div className="trascript-message no-scroll-bar">
          {messages.map((message, index) => {
            if (message.role === "assistant") {
              return (
                <p key={index} className="max-sm:text-sm">
                  {name.split(" ")[0].replace("/[,.]/g", "")}: {message.content}
                </p>
              );
            } else {
              return (
                <p
                  key={message.content}
                  className="text-primary max-sm:text-sm"
                >
                  {userName}:{message.content}
                </p>
              );
            }
          })}
        </div>
        <div className="transcript-fade"></div>
      </section>
    </section>
  );
};

export default CompanionComponent;
