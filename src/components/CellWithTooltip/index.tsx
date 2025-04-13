import { Cell, Text, Tooltip } from "@telegram-apps/telegram-ui";
import { FC, ReactNode, RefObject, useRef, useState } from "react";

export interface ICellWithTooltipProps {
  text: ReactNode;
  cellBefore: ReactNode;
}

export const CellWithTooltip: FC<ICellWithTooltipProps> = ({
  text,
  cellBefore,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const tooltipHandler = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <>
      <Cell before={cellBefore} onClick={tooltipHandler}>
        <Text ref={ref}>{text}</Text>
      </Cell>
      {showTooltip ? (
        <Tooltip mode="light" targetRef={ref as RefObject<HTMLElement>}>
          {text}
        </Tooltip>
      ) : null}
    </>
  );
};
