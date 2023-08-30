import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import { Popup } from "../../../common/popup/Popup";
import { useAdminPanelStore } from "../../../modules/admin-panel/adminPanelStore";
import { eatNonNumbers } from "../../../utils/generic";
import "ojs/ojswitch";
import "ojs/ojselectcombobox";

const validators = [new AsyncRegExpValidator({
    pattern: "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
    hint: "Enter a valid email format",
    messageDetail: "Not a valid email format",
}),];


export const CreateOrUpdateUserPopup = () => {
    const { userStore } = useAdminPanelStore();
    const { valueChangeHandler, closeCreateUpdatePopup, createOrUpdateUser } = userStore;
    const { modeIsUpdate, popupUser, requiredMessageArray, rolesDp, popupHooks, mode } = userStore;

    const Label = (props: { text: string }) => {
        return <oj-label class="oj-label oj-label-inline">{props.text}</oj-label>
    }

    const popupBody = () => {
        return (
            <>
                <Label text="Name" />
                <oj-input-text
                    value={popupUser.name}
                    onvalueChanged={(event) => valueChangeHandler(event, 'name')}
                    autocomplete="off">
                </oj-input-text>
                <br /><br />

                <Label text="Username *" />
                <oj-input-text
                    value={popupUser.username}
                    onvalueChanged={(event) => valueChangeHandler(event, 'username')}
                    messagesCustom={requiredMessageArray.username}
                    autocomplete="off"
                    readonly={modeIsUpdate}>
                </oj-input-text>
                <br /><br />

                <Label text="Email Address *" />
                <oj-input-text
                    value={popupUser.email}
                    onvalueChanged={(event) => valueChangeHandler(event, 'email')}
                    messagesCustom={requiredMessageArray.email}
                    validators={validators}
                    autocomplete="off">
                </oj-input-text>
                <br /><br />

                <Label text="Company" />
                <oj-input-text
                    value={popupUser.company}
                    autocomplete="off"
                    onvalueChanged={(event) => valueChangeHandler(event, 'company')}>
                </oj-input-text>
                <br /><br />

                <Label text="Phone #" />
                <oj-input-text
                    value={popupUser.phone}
                    messagesCustom={requiredMessageArray.phone}
                    onvalueChanged={(event) => valueChangeHandler(event, 'phone')}
                    onKeyPress={eatNonNumbers}
                    autocomplete="off">
                </oj-input-text>
                <br /><br />

                <Label text="Business Title" />
                <oj-input-text
                    value={popupUser.businessTitle}
                    onvalueChanged={(event) => valueChangeHandler(event, 'businessTitle')}
                    autocomplete="off">
                </oj-input-text>
                <br /><br />

                <Label text="Roles *" />
                <oj-select-many
                    value={popupUser.roles}
                    onvalueChanged={(event) => valueChangeHandler(event, 'roles')}
                    messagesCustom={requiredMessageArray.roles}
                    options={rolesDp}>
                </oj-select-many>
                <br /><br />

                <Label text="Active" />
                <oj-switch
                    value={popupUser.active}
                    onvalueChanged={(event) => valueChangeHandler(event, 'active')}>
                </oj-switch>
            </>
        )
    }

    const popupFooter = () => {
        return (
            <>
                <oj-button onojAction={createOrUpdateUser}>{modeIsUpdate ? 'Update' : 'Create'}</oj-button>
                <oj-button onojAction={closeCreateUpdatePopup}>Cancel</oj-button>
            </>
        )
    }

    return (<Popup show={popupHooks.createUpdate} popupTitle={`${mode} User`} body={popupBody} footer={popupFooter}></Popup>)
}