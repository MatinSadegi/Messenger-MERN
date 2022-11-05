export const showItemsVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.4,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  close: {
    opacity: 0,
    x: 100,
    transition: {
      staggerChildren: 0.2,
      duration: 0.4,
      when: "afterChildren",
    },
  },
};

export const showProfileVariants = {
  visible: {
    display: "block",
    
  },
  hidden: {
    display: "none",
    transition: {
      when: "afterChildren",
    },
  },
};
export const profile = {
  visible: {
    width: "22rem",
    height: "22rem",
    transition: {
      when: "beforeChildren",
      duration: 0.2,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hidden: {
    width: "1rem",
    height: "1rem",
    transition: {
      duration: 0.2,
      when: "afterChildren",
    },
  },
};
export const profileItems = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
