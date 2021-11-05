import React, {useState,useEffect } from 'react';
import Login from './login';
import './contacts.css'
import Paqqets from './sendPaqqets';
import {
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
} from "@reach/menu-button";
import { Spinner } from 'react-bootstrap';
import { getToken,getOrgId} from './Utils/Common';
import axios from 'axios';
import { useCookies } from "react-cookie";

export default function Contacts(props) {
    const [islogin, setIslogin]=useState(false);
    const [sendPaqqet,setsendPaqqet]=useState(false);  
    const [user, setUser]=useState(localStorage.getItem('user'));
    const [authtoken,setAuthtoken]=useState(getToken());
    const [favoriteContacts,setFavoriteContacts]=useState([]);
    const [favoriteContactDup, setFavoriteContactDup]=useState([]);
    const [data, setData]=useState([]);
    const [contacts, setContacts]=useState([]);
    const [contactsDup, setContactsDup]=useState([]);
    const [sendPaqqetdata, setSendPaqqetdata]=useState(false);
    const [isloading, setIsloading]=useState(false);
    const [showcontact, setShowcontact]=useState(false);
    const [showFavorarites, setShowFavorarites]=useState(false);
    const [name, setName]=useState('');
    const [showdelete, setShowdelete]=useState(false);
    const [filter, setFilter]=useState(false);
    const [emails, setEmails]=useState(false);
    const [contactFilters, setContactFilters]=useState(false);
    const [cookies,setCookie, removeCookie] = useCookies(["RefreshToken"]);
   useEffect(() => {
    (async () => {
    if (props.searchedName !== undefined && props.searchedName !== '') {
        setIsloading(true);
        setName(props.searchedName);
        const contacts =  await fetch(`https://api.paqqets.com/demo/v1/users/contacts?orgId=${getOrgId()}`, {
            method: "GET",
            headers: new Headers({ 'Authorization':authtoken })
        });
       
        let result =  await contacts.json();
        if (result.userContactDetails.length > 0) {
            setShowcontact(false);
            const contactList = result.userContactDetails;
            setContacts(contactList);
            setContactsDup(contactList)
            const fav = result.userContactDetails.filter((item) => item.favFlag === 1);  
            setFavoriteContacts(fav);
            setFavoriteContactDup(fav);
            const notFav = result.userContactDetails.filter((item) => item.favFlag === 0);
            setIsloading(false);
        } else {
            setShowcontact(true);
            
        }
        const lowerCased = props.searchedName.toLowerCase();
        const favcont = result.userContactDetails.filter((item) => item.favFlag === 1);  
        const favs = favcont.filter((item) => item.contactName.toLowerCase().includes(lowerCased));
        setFavoriteContacts(favs);
        if (favs.length === 0) {
            setFilter(true);
        } else {
            setFilter(false);
            setShowFavorarites(false)
            setFavoriteContacts(favs);
        }
        const contact = result.userContactDetails.filter((item) => item.contactName.toLowerCase().includes(lowerCased));
        setContacts(contact)
        if(contact.length === 0) {
            setContactFilters(true);

        } else {
            setContactFilters(false);
            setShowcontact(false);
            setContacts(contact);
        }
        setContacts(contact);
        setIsloading( false);
    } else {
        getContacts()
    }
    })();
}, [0]);
   const getContacts = async () => {
    setIsloading(true);
    const contacts = await axios.get(`https://api.paqqets.com/demo/v1/users/contacts?orgId=${getOrgId()}`,{
        headers: {
          'authorization': getToken(),
        }
      }
      ).then((response) => {
          const contactList = response.data.userContactDetails;
          if (contactList.length > 0) {
          setContacts(contactList);
          setContactsDup(contactList);
          const fav = response.data.userContactDetails.filter((item) => item.favFlag === 1);
          if (fav.length > 0) {
              setShowFavorarites(false);
          } else {
              setShowFavorarites(true);
          }
          setFavoriteContacts(fav);
          setFavoriteContactDup(fav);
          setIsloading(false);
        } else {
            setShowcontact(true);
            setShowFavorarites(true)
        }
    }).catch((error)=> {
        setIsloading(false);
    })
    setIsloading(false);
}
   const searchchange=(event)=> {
    setName(event.target.value);
    if(event.target.value === "") {
        refresh();
        setIsloading(true);
    }
}
const favDelete = (item)=>{
    let favDelete= item.id;
    var editcontact =  {
        contactId: favDelete,
          favFlag: 0,
          orgId: getOrgId()
       }
    axios.put(`https://api.paqqets.com/demo/send/v1/users/contacts?orgId=${getOrgId()}`,editcontact, {
        headers: {
          'authorization': getToken(),
        }
      } ).then((response) => {
        if(response.data.status === "SUCCESS") {
          setIsloading(false);
          refresh();
        }
      }).catch((error) => {
        if (error.response.data.status === "FAILURE") {
         setIsloading(false);
        }
      })
    }

const deleteClick=async(item)=> {
    setShowdelete(true);
    const contactId=item.id
      fetch(`https://api.paqqets.com/demo/v1/users/contacts/${contactId}?orgId=${getOrgId()}`, {
        method: 'DELETE',
        headers: new Headers({ 'Authorization':getToken() }),
    }).then((data) => {
        refresh();
    });

}
const  search=()=> {
    setIsloading(true);
    const lowerCased = name.toLowerCase();
    const fav = favoriteContactDup.filter((item) => item.contactName.toLowerCase().includes(lowerCased));
    setFavoriteContacts(fav);
    if(fav.length === 0) {
     setFilter(true);
     setIsloading(false);
    }else {
        setFilter(false);
    }
    const contact = contactsDup.filter((item) => item.contactName.toLowerCase().includes(lowerCased));
    setContacts(contact);
    if(contact.length === 0) {
        setContactFilters(true);
        setIsloading(false);
    }else {
        setContactFilters(false);
    }
    setIsloading(false);
    if(name === "") {
        refresh();
    }
}

const refresh=async()=> {
    setName("");
    setFilter(false);
    setContactFilters(false)
    const contacts = await axios.get(`https://api.paqqets.com/demo/v1/users/contacts?orgId=${getOrgId()}`,{
        headers: {
          'authorization': getToken(),
        }
      }
      ).then((response) => {
          const contactList = response.data.userContactDetails;
          if (contactList.length > 0) {
          setContacts(contactList);
          setContactsDup(contactList);
          const fav = response.data.userContactDetails.filter((item) => item.favFlag === 1);
          if (fav.length > 0) {
              setShowFavorarites(false);
          } else {
              setShowFavorarites(true);
          }
          setFavoriteContacts(fav);
          setFavoriteContactDup(fav);
        } else {
            setShowcontact(true);
        }
    }).catch((error)=> {
        setIsloading(false);
    })
    setIsloading(false);
}
const contactsClick=(event) =>{
    setData(event);
    setEmails(true);
    setSendPaqqetdata(true);
    setsendPaqqet(true);
    setIslogin(false);
    return <Paqqets />
}
const  contactsPhoneClick=(event)=> {
    setData(event);
    setEmails(false);
    setSendPaqqetdata(true);
    setsendPaqqet(true);
    setIslogin(false);
    return <Paqqets />
}
 const logout=()=> {
        localStorage.clear();
        setsendPaqqet(false);
        setIslogin(true);
        removeCookie("RefreshToken");
        return <Login />
    }
    const sendPaqqetScreen=()=> {
        setsendPaqqet(true);
        setIslogin(false);
        return <Paqqets />
    }
    const Contacts=()=> {
        setsendPaqqet(false);
        setIslogin(false);
    }
    if (!islogin && !sendPaqqet) {
        return (
            <div className="card-wids">
                <div className="header">
                    <div className="form-row">
                        <div className="form-group col-xs-6">
                            <img className="logo-image" src={require('./paqqet-logo.png')} />
                        </div>
                        <div className="form-group col-xs-6">
                            <Menu>
                                <MenuButton className="menu-button">
                                    <i className="fas fa-bars embar"></i>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem className="menu-label">Hi {user}</MenuItem>
                                    <MenuItem onSelect={sendPaqqetScreen} className="menu-label"><i className="fas fa-paper-plane menu-icon"></i>Send Paqqet</MenuItem>
                                    <MenuItem onSelect={Contacts} className="menu-label"><i className="fas fa-users menu-icon"></i>contacts</MenuItem>
                                    <MenuItem onSelect={logout} className="menu-label"><i className="fas fa-sign-out-alt menu-icon"></i>
                                      logout
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className="paqs">
                    <div className="form-row Menu-label">
                        <div className="form-group col-xs">
                            <i className="fa fa-heart con-icons"></i>
                        </div>
                        <div className="form-group col-xs">
                            <h2 className="recent">Favorites</h2>
                        </div>
                        {isloading && <div className="form-group col-xs"><Spinner animation="border" role="status" className="spin">
                        </Spinner></div>}
                    </div>
                    {!showcontact && !showFavorarites && !filter &&<div className="contacts-box">
                        {favoriteContacts.map((item, i) => {
                            return (
                                <div className="form-row menu-label">

                                    <div className="form-group col-xs-2">
                                        <i className="fas fa-user menu-icons icon-mar"></i>
                                    </div>
                                    <div className="form-group col-xs-2">
                                        <div className="text-name">{item.contactName}</div>
                                    </div>
                                    <div className="form-group col-xs-2">
                                        <button disabled={!item.contactEmailAddress} onClick={() => contactsClick(item)}><i className="fa fa-envelope menu-icons" ></i></button>
                                        <button disabled={!item.contactPhoneNumber} onClick={() => contactsPhoneClick(item)}> <i className="fas fa-phone menu-icons" ></i></button>
                                   
                                    </div>
                                      <i class="fa fa-trash mt-2" aria-hidden="true" onClick={() => favDelete(item)}></i>
                                  
                                    {/* <i class="fa fa-trash mt-2" aria-hidden="true" onClick={() =>deleteClick(item)}></i> */}
                                </div>
                            )
                        })}
                    </div>}
                    {showFavorarites && !filter &&<div className="contacts-box text-colors">
                        No Favorites are available
                    </div>}
                    {filter  && <div className="contacts-box text-colors">
                        Your search did not match any Favorites</div>}
                    <hr></hr>
                    <div className="form-row Menu-label">
                        <div className="form-group col-xs">
                            <i className="fa fa-users con-icons"></i>
                        </div>
                        <div className="form-group col-xs">
                            <h2 className="recent">Contacts</h2>
                        </div>
                        {isloading && <div className="form-group col-xs"><Spinner animation="border" role="status" className="spin">
                        </Spinner></div>}
                     
                    </div>
                    {!showcontact && !contactFilters && <div className="contacts-box">
                        {contacts.map((item, i) => {
                            return (
                                <div className="form-row menu-label">
                                    {/* {isloading && <Spinner animation="border" role="status">
                                    </Spinner>} */}
                                    <div className="form-group col-xs-2">
                                        <i className="fas fa-user menu-icons icon-mar"></i>
                                    </div>
                                    <div className="form-group col-xs-2">
                                        <div className="text-name">{item.contactName}</div>
                                    </div>
                                    <div className="form-group col-xs-2">
                                        <button disabled={!item.contactEmailAddress} onClick={() => contactsClick(item)}><i className="fa fa-envelope menu-icons" ></i></button>
                                        <button disabled={!item.contactPhoneNumber} onClick={() => contactsPhoneClick(item)}> <i className="fas fa-phone menu-icons" ></i></button>
                                    </div>
                                    <i class="fa fa-trash mt-2" aria-hidden="true" onClick={() =>deleteClick(item)}></i>
                                </div>
                            )
                        })}
                    </div>}
                    {showcontact && !filter  &&<div className="contacts-box text-colors">
                        No Contacts are available
                    </div>} 
                    {  contactFilters && <div className="contacts-box text-colors">
                    Your search did not match any contacts </div>}
                    <div className="form-row contact-search">
                        <div className="form-group col-xs-4">
                            <input className="serch-filter filter-type" type="search" value={name} onChange={searchchange} />
                        </div>
                        <div className="form-group col-xs-4" >
                            <button className="bts btn-s searchButton serch-type" onClick={search}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="footer">
                <p className="copy-right"> © {new Date().getFullYear()} Paqqets, LLC | All Rights Reserved.</p>
                </div>
            </div>
        );

    } else if (sendPaqqet && !islogin) {
        return <Paqqets rowData={data} email={emails} />
    } else {
        return <Login />
    }
}