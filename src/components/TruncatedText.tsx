import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface TruncatedTextProps extends HTMLAttributes<HTMLElement> {
  text: string; // النص اللي هيتعرض
  maxLength: number; // الحد الأقصى لعدد الحروف
  tag?: string; // نوع الـ tag (مثل h2, p, span)
}

const TruncatedText = ({
  text,
  maxLength,
  tag = "h2", // افتراضي h2 زي المثال
  className,
  ...props
}: TruncatedTextProps) => {
  // قطع النص لو أطول من maxLength
  const truncatedText = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  // إنشاء الـ tag ديناميكيًا
  const Tag = tag;

  return (
    <Tag
      className={cn(
        "truncate", // بيمنع النص من التفاف إذا كان طويل
        className, // الكلاسات الأصلية (مثل text-lg font-bold)
      )}
      style={{
        lineHeight: "1.5", // ضبط الارتفاع بناءً على حجم النص
        maxHeight: "1.5em", // ارتفاع مناسب لسطر واحد (يمكن تعديله)
        overflow: "hidden", // إخفاء النص الزيادة
      }}
      {...props}
    >
      {truncatedText}
    </Tag>
  );
};

export default TruncatedText;
