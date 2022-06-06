import { useAppSelector } from "src/store/hooks";
import { actorEnum } from "./privilage-values";
import { bitDecoder } from "./role-decoder";

export const RoleBasedGuard = (props) => {
    const user = useAppSelector((state) => state.user.value)
    const actorVal = actorEnum[user];
    const { children, codeValue } = props;
    //const { user } = useAuth();
    
    // Here check the user permissions
    console.log({codeValue, actorVal})
    const canView = bitDecoder(codeValue, actorVal) === codeValue;
    
    /* if (!canView) {
      return null;
    } */
  
    return children;
};