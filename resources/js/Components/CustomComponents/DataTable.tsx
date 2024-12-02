"use client";
import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../ui/animated-modal";
import ShinyButton from "../ui/shiny-button";
import { NotesTable } from "./NotesTable";

export const DataTable = () => {
    return (
        <div className="flex items-center justify-center">
            <Modal>
                <ModalTrigger className="">
                    <ShinyButton className="w-auto">Expand</ShinyButton>
                </ModalTrigger>
                <ModalBody>
                    <ModalContent className="w-full max-w-auto">
                        {" "}
                        {/* Increased width here */}
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Account Notes
                        </h4>
                        <NotesTable className="max-w-auto font-mono text-lg" />
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    );
};
