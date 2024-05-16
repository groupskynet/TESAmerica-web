import NiceModal from "@ebay/nice-modal-react";
import { useModal } from "@ebay/nice-modal-react";

export default NiceModal.create(({ }) => {
  const modal = useModal();
  return (<div>modal</div>);
});