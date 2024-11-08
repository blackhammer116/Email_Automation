import { Button, Dialog, DialogPanel } from '@tremor/react';
import React from 'react';

export default function DialogPopup(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] = React.useState("Unsuccessful")

  // setStatus( () => {
  //   if (props.status == "true"){
  //     return "Successful";
  //   }
  // })
  return (
    <>
    <Button className="mx-auto block" onClick={() => setIsOpen(true)}>Open Dialog</Button>
    <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
      <DialogPanel>
        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">Account Created Successfully</h3>
        <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {props.message}
        </p>
        <Button className="mt-8 w-full" onClick={() => setIsOpen(false)}>
          Continue
        </Button>
      </DialogPanel>
    </Dialog>
    </>
  );
}