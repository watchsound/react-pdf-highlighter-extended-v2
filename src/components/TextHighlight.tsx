import React, { CSSProperties, MouseEvent } from "react";

import "../style/TextHighlight.css";

import type { ViewportHighlight } from "../types";

/**
 * The props type for {@link TextHighlight}.
 *
 * @category Component Properties
 */
export interface TextHighlightProps {
  /**
   * Highlight to render over text.
   */
  highlight: ViewportHighlight;

  /**
   * Callback triggered whenever the user clicks on the part of a highlight.
   *
   * @param event - Mouse event associated with click.
   */
  onClick?(event: MouseEvent<HTMLDivElement>): void;

  /**
   * Callback triggered whenever the user enters the area of a text highlight.
   *
   * @param event - Mouse event associated with movement.
   */
  onMouseOver?(event: MouseEvent<HTMLDivElement>): void;

  /**
   * Callback triggered whenever the user leaves  the area of a text highlight.
   *
   * @param event - Mouse event associated with movement.
   */
  onMouseOut?(event: MouseEvent<HTMLDivElement>): void;

  /**
   * Indicates whether the component is autoscrolled into view, affecting
   * default theming.
   */
  isScrolledTo: boolean;

  /**
   * Callback triggered whenever the user tries to open context menu on highlight.
   *
   * @param event - Mouse event associated with click.
   */
  onContextMenu?(event: MouseEvent<HTMLDivElement>): void;

  /**
   * Optional CSS styling applied to each TextHighlight part.
   */
  style?: CSSProperties;
}

/**
 * A component for displaying a highlighted text area.
 *
 * @category Component
 */
export const TextHighlight = ({
  highlight,
  onClick,
  onMouseOver,
  onMouseOut,
  isScrolledTo,
  onContextMenu,
  style,
}: TextHighlightProps) => {
  const highlightClass = isScrolledTo ? "TextHighlight--scrolledTo" : "";
  const { rects } = highlight.position;
  const { highlightType, color, emoji } = highlight;
  return (
    <div
      className={`TextHighlight ${highlightClass}`}
      onContextMenu={onContextMenu}
    >
      {emoji ? (
        <div
          className="TextHighlight__emoji"
          style={{
            left: 20,
            top: rects[0].top,
          }}
        >
          {emoji}
        </div>
      ) : null}
      <div className="TextHighlight__parts">
        {rects.map((rect, index) => {
          let { left, top,width, height } = rect;  
          if (highlightType == 'underline') { top = top +height-1; height = 2; }
          if (highlightType == 'dashline') { top = top +height-1; height = 0; }
          if (highlightType == 'strikeline') { top = top +height/2; height = 2; }        
          return (
            <div
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
              key={index}
              style={{ left, top, width, height, ...style }}
              className={`TextHighlight__part TextHighlight__${highlightType || 'highlight'} TextHighlight__color_${color || 'info'}`}
            />
          )}
        )}
      </div>
    </div>
  );
};
