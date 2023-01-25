import React from 'react';
import Button from '../UI/Button/Button';
import './navigation.scss';

type Props = {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

const Navigation = ({ currentTab, setCurrentTab }: Props) => {
  const tabs = [
    { text: 'Personal information' },
    { text: 'Change password' },
    { text: 'Delete account' },
  ];

  return (
    <nav className="navigation">
      {tabs.map((tab) => (
        <Button
          text={tab.text}
          //   hasOutline={currentTab !== tab.text}
          isActive={currentTab === tab.text}
          onClick={() => setCurrentTab(tab.text)}
        />
      ))}
    </nav>
  );
};

export default Navigation;
