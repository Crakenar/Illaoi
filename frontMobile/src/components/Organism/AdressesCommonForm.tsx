import DropDownPicker from "react-native-dropdown-picker";
import TextInputIL from "../Atoms/TextInputIL";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import { useSelector } from "react-redux";
import { ActionTypeId } from "../../enums/GlobalEnums";

export default function AdressesCommonForm({
  label,
  items,
  editable,
  dragListData,
  loading,
  value,
  open,
  setLabel,
  setOpen,
  setValue,
  renderItem,
  onReordered,
  keyExtractor,
  onSelectItemCallback,
}: any) {
  const actionTypeId = useSelector((state: any) => {
    return state.store.actionTypeId;
  });
  return (
    <>
      <TextInputIL
        placeholder="Enter label"
        value={label}
        editable={editable}
        onChangeTextCallback={(text) => setLabel(text)}
      />
      {(actionTypeId === ActionTypeId.ADD ||
        actionTypeId === ActionTypeId.EDIT) && (
        <DropDownPicker
          loading={loading}
          schema={{
            label: "label",
            value: "id",
          }}
          modalProps={{
            animationType: "fade",
          }}
          modalContentContainerStyle={{
            backgroundColor: "#fff",
          }}
          searchable={false}
          modalTitle="Select multiple packages to add"
          multiple={true}
          open={open}
          value={value}
          min={0}
          items={items}
          placeholder="Add Packages"
          setOpen={setOpen}
          setValue={setValue}
          onSelectItem={(item: any) => {
            onSelectItemCallback(item);
          }}
        />
      )}
      {actionTypeId !== ActionTypeId.ADD && (
        <DragList
          data={dragListData}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}
        />
      )}
    </>
  );
}
