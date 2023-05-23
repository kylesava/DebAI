import { Radio, Tabs } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import DebateBox from '../../DebateBox/DebateBox';


const MyDebates = ({pastDebates, futureDebates, invitationDebates}) => {
  const [size, setSize] = useState('large');
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    setTabs([{
      title: "Past Debates",
      debates: pastDebates
    },{
      title: "Future Debates",
      debates: futureDebates
    },{
      title: "Invitation Debates",
      debates: invitationDebates
    }])
  }, [pastDebates, futureDebates, invitationDebates])

  const onChange = (e) => {
    setSize(e.target.value);
  };
  return (
    <div style={{width:"100%"}} className="myDebates">
      <Tabs
        
        defaultActiveKey="1"
        type="card"
        size={size}
        items={tabs.map((tab, i) => {
          const id = String(i + 1);
          return {
            label: tab.title,
            key: id,
            children: <DebateBox debates={tab.debates} />,
          };
        })}
      />
    </div>
  );
};
export default MyDebates;