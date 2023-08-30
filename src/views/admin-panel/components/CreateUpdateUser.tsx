// import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
// import ArrayDataProvider = require("ojs/ojarraydataprovider");
// import Message = require("ojs/ojmessaging")
// import { NewUser, User, UserService } from "src/modules/admin-panel/users/userService";
// import { Popup } from "src/common/popup/Popup";
// import { useState, useEffect } from 'react';

// export type CreateOrUpdateType = "Create" | "Update";
// type CreateOrUpdateUserProps = {
//     mode: CreateOrUpdateType,
//     showPopup: boolean,
//     closePopup: (mode: CreateOrUpdateType) => void,
//     rolesDP: ArrayDataProvider<any, any>,
//     allUsers: User[],
//     selectedUser?: User,
// }

// const CONSTANTS = {
//     CREATE: "Create",
//     UPDATE: "Update",
//     INLINE_CLASS: "oj-label oj-label-inline",
//     VALIDATORS: [new AsyncRegExpValidator({
//         pattern: "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
//         hint: "Enter a valid email format",
//         messageDetail: "Not a valid email format",
//     }),],
//     MESSAGES: {
//         FIELD_NOT_EMPTY: "This field cannot be empty.",
//         USERNAME_TAKEN: "This username has already been taken.",
//         ONLY_UNDERSCORE: "Invalid username, you can only use underscore.",
//         EMAIL_INUSE: "Email address is already in use.",
//         MUST_SELECT: "You must select a value for this field.",
//         ONLY_NUMBER: "Only numbers are allowed."
//     }
// }
// const emptyValuesUser = UserService.getNewUser();
// type RequiredValidatorMessages = { username?: Message[], email?: Message[], phone?: Message[], roles?: Message[] }

// export const CreateOrUpdateUserPopup = (props: CreateOrUpdateUserProps) => {
//     const { mode, showPopup, closePopup, rolesDP, allUsers, selectedUser } = props;
//     const [newUser, setNewUser] = useState<NewUser>(emptyValuesUser);
//     const intialValidatorMessages: RequiredValidatorMessages = {};
//     const [requiredMessageArray, setRequiredMessageArray] = useState<RequiredValidatorMessages>(intialValidatorMessages);
//     const modeIsUpdate = mode == "Update";

//     useEffect(() => {
//         modeIsUpdate ? setNewUser(selectedUser) : setNewUser(emptyValuesUser);
//     }, [mode])

//     const valueChangeHandler = (event: any, key: keyof typeof newUser) => {
//         let value = event.detail.value;
//         let user = { ...newUser, [key]: value };
//         // user[key] = value;
//         setNewUser(user);
//     }

//     const errorMessage = (text: string) => { return new Message("summary", text, "error"); }

//     const createOrUpdateUser = async () => {
//         if (validationChecksPassed()) {
//             closePopup(mode);
//             let response = modeIsUpdate ? await userService.updateUser(newUser) : await userService.createUser(newUser);
//             Store.dispatch(setMessages([response.message]));
//             if (response.data) {
//                 let updatedUser: User = response.data as User;
//                 let filteredUsers = allUsers.filter(user => { return user.id != updatedUser.id });
//                 updatedUser.roles = updatedUser.roles.map(element => { return element.name });
//                 let updatedUsers = [updatedUser, ...filteredUsers];
//                 Store.dispatch(setUsers(updatedUsers));
//             }
//         }
//     }

//     const validationChecksPassed = (): boolean => {
//         const { username, email, roles, phone } = newUser;
//         setRequiredMessageArray(intialValidatorMessages);

//         const usernameErrors = username.length < 1 ? [errorMessage(CONSTANTS.MESSAGES.FIELD_NOT_EMPTY)] :
//             username.split(" ").length > 1 ? [errorMessage(CONSTANTS.MESSAGES.ONLY_UNDERSCORE)] :
//                 (!modeIsUpdate ? allUsers.find(user => user.username === username) ? [errorMessage(CONSTANTS.MESSAGES.USERNAME_TAKEN)] : [] : []);

//         const emailErrors = !email ? [errorMessage(CONSTANTS.MESSAGES.FIELD_NOT_EMPTY)] :
//             (!modeIsUpdate ? allUsers.find(user => user.email === email) ? [errorMessage(CONSTANTS.MESSAGES.EMAIL_INUSE)] : [] : []);

//         const rolesError = !roles || roles.length < 1 ? [errorMessage(CONSTANTS.MESSAGES.MUST_SELECT)] : [];
//         const validatorMessages: RequiredValidatorMessages = { username: usernameErrors, email: emailErrors, roles: rolesError };
//         setRequiredMessageArray(validatorMessages);

//         return !Object.values(validatorMessages).flat().some(value => value);
//     };


//     const cancelAction = () => {
//         closePopup(mode);
//         setNewUser(new NewUser());
//         setRequiredMessageArray(intialValidatorMessages);
//     }

//     const Label = (props: { text: string }) => {
//         return <oj-label class={CONSTANTS.INLINE_CLASS}>{props.text}</oj-label>
//     }

//     const popupBody = () => {
//         return (
//             <>
//                 <Label text="Name" />
//                 <oj-input-text value={newUser.name} onvalueChanged={(event) => valueChangeHandler(event, 'name')}
//                     autocomplete="off"></oj-input-text><br /><br />

//                 <Label text="Username *" />
//                 <oj-input-text value={newUser.username} onvalueChanged={(event) => valueChangeHandler(event, 'username')}
//                     messagesCustom={requiredMessageArray.username} autocomplete="off" readonly={modeIsUpdate}></oj-input-text><br /><br />

//                 <Label text="Email Address *" />
//                 <oj-input-text value={newUser.email} onvalueChanged={(event) => valueChangeHandler(event, 'email')}
//                     messagesCustom={requiredMessageArray.email} validators={CONSTANTS.VALIDATORS}
//                     autocomplete="off"></oj-input-text><br /><br />

//                 <Label text="Company" />
//                 <oj-input-text value={newUser.company} autocomplete="off"
//                     onvalueChanged={(event) => valueChangeHandler(event, 'company')}></oj-input-text><br /><br />

//                 <Label text="Phone #" />
//                 <oj-input-text value={newUser.phone} messagesCustom={requiredMessageArray.phone}
//                     onvalueChanged={(event) => valueChangeHandler(event, 'phone')} onKeyPress={eatNonNumbers}
//                     autocomplete="off"></oj-input-text><br /><br />

//                 <Label text="Business Title" />
//                 <oj-input-text value={newUser.businessTitle} onvalueChanged={(event) => valueChangeHandler(event, 'businessTitle')}
//                     autocomplete="off"></oj-input-text><br /><br />

//                 <Label text="Roles *" />
//                 <oj-select-many value={newUser.roles} onvalueChanged={(event) => valueChangeHandler(event, 'roles')}
//                     messagesCustom={requiredMessageArray.roles} options={rolesDP}></oj-select-many><br /><br />

//                 <Label text="Active" />
//                 <oj-switch value={newUser.active} onvalueChanged={(event) => valueChangeHandler(event, 'active')}></oj-switch>
//             </>
//         )
//     }

//     const popupFooter = () => {
//         return (
//             <>
//                 <oj-button onojAction={createOrUpdateUser}>{modeIsUpdate ? CONSTANTS.UPDATE : CONSTANTS.CREATE}</oj-button>
//                 <oj-button onojAction={cancelAction}>Cancel</oj-button>
//             </>
//         )
//     }

//     return (<Popup show={showPopup} popupTitle={`${mode} User`} body={popupBody} footer={popupFooter}></Popup>)
// }