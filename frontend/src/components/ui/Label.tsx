import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> { }

// reusable label component
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className = '', ...props }, ref) => {
        return (
            <label
                ref={ref}
                className={`flex items-center gap-2 text-sm font-medium leading-none select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${className}`}
                {...props}
            />
        );
    }
);

Label.displayName = "Label";
