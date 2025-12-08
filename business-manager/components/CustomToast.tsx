import { X } from 'lucide-react'
import React from 'react'
import { ToastContainer, CloseButtonProps } from 'react-toastify';

// Safe close button component
const SafeCloseButton = (props: CloseButtonProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Multiple safety checks
        if (props.closeToast && typeof props.closeToast === 'function') {
            try {
                props.closeToast();
            } catch (error) {
                console.warn('Error closing toast:', error);
                // Fallback: try to close via DOM if available
                const toastElement = e.currentTarget.closest('.Toastify__toast');
                if (toastElement) {
                    toastElement.remove();
                }
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            className="text-red-500 hover:text-red-700 p-1 transition-colors duration-200"
            aria-label="Close notification"
        >
            <X size={18} />
        </button>
    );
};

const CustomToast = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover

            // 🔹 Custom classes
            className="z-50"
            toastClassName={() =>
                "bg-gray-900 text-white rounded-lg shadow-lg p-4 flex gap-2 md:w-fit w-full"
            }
            progressClassName="bg-green-400"
            closeButton={SafeCloseButton}
        />
    )
}

export default CustomToast