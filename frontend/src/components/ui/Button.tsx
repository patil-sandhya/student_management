import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'delete' | 'edit';
    size?: 'sm' | 'md' | 'lg' | 'default';
}

// reusable button component with variants,size and loading state
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'default', isLoading = false, children, disabled, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none";

        // button variants
        const variants = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-secondary/50",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary/50",
            ghost: "hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary/50",
            link: "text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary/50",
            delete: "bg-red-500 text-red-50 hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-500/50",
            edit: "bg-yellow-500 text-yellow-50 hover:bg-yellow-600 focus-visible:ring-2 focus-visible:ring-yellow-500/50",
        };


// button sizes
        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-9 px-4 py-2",
            lg: "h-12 px-8 text-lg",
            default: "h-9 px-4 py-2",
        };

        const variantStyles = variants[variant];
        const sizeStyles = sizes[size];

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button"