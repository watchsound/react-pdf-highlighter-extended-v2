import React, { useLayoutEffect, useRef, useState } from "react";
import CommentForm from "./CommentForm";
import {
  // GhostHighlight,
  PdfSelection,
  usePdfHighlighterContext,
} from "./react-pdf-highlighter-extended";
import "./style/ExpandableTip.css";
import { CommentedHighlight } from "./types";

interface ExpandableTipProps {
  addHighlight: (highlight: CommentedHighlight ) => void;
}

const ExpandableTip = ({ addHighlight }: ExpandableTipProps) => {
  const [compact, setCompact] = useState(true);
  const selectionRef = useRef<PdfSelection | null>(null);

  const {
    getCurrentSelection,
    removeGhostHighlight,
    setTip,
    updateTipPosition,
  } = usePdfHighlighterContext();

  useLayoutEffect(() => {
    updateTipPosition!();
  }, [compact]);

  return (
    <div className="Tip">
      {compact ? (
        <button
          className="Tip__compact"
          onClick={() => {
            setCompact(false);
            selectionRef.current = getCurrentSelection();
            selectionRef.current!.makeGhostHighlight();
          }}
        >
          Add highlight
        </button>
      ) : (
        <CommentForm
          onSubmit={(title, summary, highlightType, color, emoji) => {
            addHighlight(
              {
                id: -1,
                content: selectionRef.current!.content,
                position: selectionRef.current!.position,
                title: title || "",
                summary: summary || "",
                mindmap: "",
                highlightType: highlightType || 'highlight',
                color: color || 'info',
                emoji: emoji || "",
                hasQuiz: false,
                tags: [],
                rate: 0,
                highlightOnly: false
              }
            );

            removeGhostHighlight();
            setTip(null);
          }}
        />
      )}
    </div>
  );
};

export default ExpandableTip;
