import { useContext, useState } from "react"
import { Tabs } from "dracula-ui"
import NavTabForAuth from "./NavTabForAuth"
import { TodoContext } from "../../context/TodoContext"
import { Box , Input , Button } from "dracula-ui"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

const NavTabsForAuth = () => {
  const [ activeTab, setActiveTab ] = useState(2)

  const tabs = [
    { id: 1, text: "SignUp", },
    { id: 2, text: "SignIn",},
    
  ]

  const handleClick = (tab) => {
    setActiveTab(tab.id)
  }

  return (
    <>
    <Tabs color="pink">
      {tabs.map(tab => 
        <NavTabForAuth key={tab.id} id={tab.id} onClick={() => handleClick(tab)} activeTab={activeTab} text={tab.text} count={tab.count} />
      )}
    </Tabs>

   {
    activeTab == 1 && (
        <SignUp/>
    )
   }
   {
    activeTab == 2 && (
        <SignIn/>
    )
   }
    </>
    
  )
}

export default NavTabsForAuth