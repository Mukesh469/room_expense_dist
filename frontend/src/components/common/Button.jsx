const Button = ({
  children,
  handleSubmit,
  type = "button",
  disabled = false,
  loading = false,
  icon,        
  iconRight,  
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={handleSubmit}
      disabled={disabled || loading}
      className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg px-5 py-3 transition-all duration-300 flex items-center justify-center gap-2 ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
          {iconRight && <span>{iconRight}</span>}
        </>
      )}
    </button>
  );
};

export default Button;