# Signature Request Replacement

## Project Summary
It is common in the construction industry for a builder to have documents that require signatures from employees, subcontractors, home owners, etc. Buildertrend currently has a method for facilitating these signature requests by allowing builders to request signatures on PDFs to any user on their account. This system is fairly rudimentary however, it simply gives a signer the ablitity to markup a PDF that the requestor sent to them. This means the signer can sign the document anywhere on the document, and there is no way for signer to save and reuse a signature they created. The goal of this project is to create a proof of concept application that will allow a builder to request that a signer signs specific areas of a pdf and allow a signer to set signtures onto thos locations (and only those locations).

## Deliverables
A standalone application that allows allows a user to upload pdfs, select areas to be signed and allows a signer to create signatures and place them in the signature areas.

## Requirements
* Create an application using .NET/SQL Server for the backend (a react frontend is encouraged but not required)
* Allow users to upload a pdf to be signed
* Allow users to select areas on the pdf to be signed
* Allow signers to create signatures
* Allow signatures to be placed selected areas
* Save PDF and have signatures persist


## Stretch Goals
* Add options to request initials and dates on top of just signatures
* Allow requestors to send the pdf to multiple signers
* Notify the requestor on signature completion
* Add due dates for the signatures to be signed

#### Point of Contact: Shaun Williams
#### Technical Contact: David Weinstein
