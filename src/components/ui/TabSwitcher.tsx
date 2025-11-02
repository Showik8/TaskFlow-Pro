import { useState } from "react";

const enum Tabs {
  signUp = "Sign Up",
  signIn = "Sign In",
}

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.signIn);

  return (
    <div className="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2 bg-gray-200">
      <button
        className={
          ` ${activeTab === Tabs.signIn && "bg-gray-100"} ` +
          " h-full rounded-lg"
        }
        onClick={() => setActiveTab(Tabs.signIn)}
      >
        {Tabs.signIn}
      </button>
      <button
        className={
          ` ${activeTab === Tabs.signUp && "bg-gray-100"} ` +
          " h-full rounded-lg"
        }
        onClick={() => setActiveTab(Tabs.signUp)}
      >
        {Tabs.signUp}
      </button>
    </div>
  );
};

export default TabSwitcher;
