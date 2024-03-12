import { Text } from "dracula-ui"

const NavTabForAuth = ({ onClick, id, text, count, activeTab }) => {
  return (
    <li className={id === activeTab ? "drac-tab drac-tab-active" : "drac-tab"}
      onClick={onClick} 
      style={{cursor: "pointer", userSelect: "none"}}
    >
      <Text px="sm">
        {text}
      </Text>
    </li>
  )
}

export default NavTabForAuth