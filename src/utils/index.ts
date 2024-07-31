export const stringToColor = (str: string): string => {
    if (str) {
      // 计算字符串的哈希值
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      // 将哈希值转化为颜色值
      let color = "#";
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).slice(-2);
      }
      return color;
    } else {
      return str;
    }
  };
  export const getTextColorForBackground = (
    str: string
  ): { backgroundColor: string; textColor: string } => {
    if (str) {
      const backgroundColor = stringToColor(str);
      const r = parseInt(backgroundColor.substring(1, 3), 16);
      const g = parseInt(backgroundColor.substring(3, 5), 16);
      const b = parseInt(backgroundColor.substring(5, 7), 16);
  
      // 计算亮度 (YIQ公式)
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      const textColor = yiq >= 128 ? "#000000" : "#FFFFFF";
      return { backgroundColor, textColor };
    } else {
      return { backgroundColor: "", textColor: "#FFFFFF" };
    }
  };
  
  export const semicolon = (number: number | string) => {
    return new Intl.NumberFormat().format(Number(number));
  };
  