import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/utilities/contact';
import { CONTACT } from 'src/app/utilities/contact-list';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  host: {class: "contactList"}
})
export class ContactListComponent implements OnInit {
  contactList: Contact[] = CONTACT;

  constructor() { }

  ngOnInit(): void {
  }

}
