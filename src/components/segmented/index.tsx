import { useState } from "react";
import "./index.css";
import { Text } from "../text";
export default function Segmented({
  value = "",
  data = [],
  onChange,
}: {
  value?: string;
  data?: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string) => void;
}) {
  const [segmentedValue, setSegmentedValue] = useState<string>(value);
  return (
    <div className="segmented-box">
      {data.map((item, index) => (
        <div
          key={index}
          className={segmentedValue === item.value ? "a" : ""}
          onClick={() => {
            setSegmentedValue(item.value);
            onChange && onChange(item.value);
          }}
        >
          <Text>{item.label}</Text>
        </div>
      ))}
    </div>
  );
}
