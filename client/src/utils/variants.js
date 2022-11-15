
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

export const parentTyping = {
  on: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const typing = {
  on: {
    display: "inline-block",
    y: [0, -3, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      type: "spring",
    },
  },
};
export const inboxVariant = {
  visible: {
    left: 150,
    transform: "translateX(0%)",
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
  hidden: {
    transform: "translateX(0%)",
    left: -150,
    transition: {
      duration: 0.3,
    },
  },
  m_visible: {
    transform: "translateX(0%)",
    left: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
  m_hidden: {
    left: 0,
    transform: "translateX(100%)",
    transition: {
      duration: 0.3,
    },
  },
};
export const showSideBarVariant = {
  visible: {
    left: "0",
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  hidden: {
    left: "-100%",
    transition: {
      duration: 0.3,
    },
  },
};
