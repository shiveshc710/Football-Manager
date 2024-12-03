import { motion } from "framer-motion";
import { Circles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import "./motion.css";

// Motion Div Component
export const MotionDiv = ({ ...props }) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 0.85 }}
      exit={{
        x: -100,
        opacity: 0,
        transition: { type: "spring", duration: 0.5 },
      }}
      transition={{ ease: ["easeIn", "easeOut"], duration: 0.5 }}
      {...props}
    />
  );
};

interface MotionButtionProps {
  isLoading: boolean;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

// Motion Button Component
export const MotionButton = ({
  isLoading,
  onClick,
  disabled,
  ...props
}: MotionButtionProps) => {
  const [loading, setLoading] = useState(isLoading);
  const [disabledInside, setDisabledInside] = useState(disabled);

  useEffect(() => {
    setLoading(isLoading);
    setDisabledInside(disabled);
  }, [isLoading, disabled]);

  const handleClick = async () => {
    setLoading(true);
    if (onClick) {
      await onClick();
    }
    setLoading(false);
  };

  return (
    <motion.button
      className="button"
      initial={{ opacity: 0 }}
      disabled={disabledInside}
      animate={{
        opacity: disabled ? 0.5 : 1,
        transition: { ease: ["easeIn", "easeOut"], duration: 2.0 },
      }}
      whileHover={
        !disabledInside
          ? {
              scale: 1.1,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      whileTap={
        !disabledInside
          ? {
              scale: 0.9,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <Circles
          height="30"
          width="30"
          color="#fff"
          ariaLabel="loading"
          visible={true}
        />
      ) : (
        props.children
      )}
    </motion.button>
  );
};
