import { ActionTypeId, ActionTypeLabel } from "../enums/GlobalEnums";

export function getActionTypeLabel(id: ActionTypeId): ActionTypeLabel {  
  switch (id) {
    case ActionTypeId.ADD:
      return ActionTypeLabel.ADD;
    case ActionTypeId.EDIT:
      return ActionTypeLabel.EDIT;
    case ActionTypeId.DELETE:
      return ActionTypeLabel.DELETE;
    case ActionTypeId.DETAILS:
      return ActionTypeLabel.DETAILS;
      case null:
      case undefined:
        return ActionTypeLabel.NONE;
    default:
      // Handle the case where an invalid ID is provided
      throw new Error("Invalid ActionTypeId");
  }
}