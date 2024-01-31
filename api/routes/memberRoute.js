const express = require('express');
const router = express.Router();
const Member = require('../models/member.js'); // Assuming the file path is correct


router.post('/add', async (req, res) => {
	try {
	  let { firstName, lastName, dateOfBirth, gender, phoneNumber, country } = req.body;
	  const registrationDate = new Date(); // Set registrationDate to the current date
	  let status = "en attente";
	  const birthDate = new Date(dateOfBirth);
		let age = registrationDate.getFullYear() - birthDate.getFullYear();

		// check phone number format here 
		phoneNumber = phoneNumber.replace(/\D/g, ''); 
		if (phoneNumber.length  != 10) {
			return res.status(400).json({
				message: "Le format du numéro de téléphone est invalide."
			});
		}
		if (phoneNumber.startsWith('0')) {
			phoneNumber = '+212' + phoneNumber.substring(1);}
		// Insert spaces or hyphens for readability (optional)
		phoneNumber = phoneNumber.replace(/(\d{3})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');


	  	// a *** (bonus : the --age if the birthday hasnt passed yet)
		// if the registrationDate is betwwen 12h and 21h
		// status valide : status en attente
		if (registrationDate.getHours() >= 12 && registrationDate.getHours() < 21) {
			status = "valide";
		} else {
			status = "en attente";
		};
		//b ***

		// if morocan min age > 16
		if (country == 'maroc') {
			if (age <= 16) {
				return res.status(400).json({
					message: "l'age minimum pour un marocain est de 16 ans."
				});
			};
		} else {
		// if from another country min age > 18
			if (age <= 18) {
				return res.status(400).json({
					message: "l'age minimum pour un etranger est de 18 ans."
				});
			};
		};

		//c ***
		// from the 11 inscription age should be betwwen average age 10 % and average age -10%
		const memberList = await Member.findAll();
		if (memberList.length >= 11) {
			// calulate the average age
			// getinng list member ages
			let memberAges = memberList.map(member => {
				const memberBirthDate = new Date(member.dateOfBirth) ;
				return registrationDate.getFullYear() - memberBirthDate.getFullYear()
			});
			// get the sum of the ages 
			let sumAges = memberAges.reduce((accumulator, currentValue) => {
				return accumulator + currentValue;
			})
			let averageAge = Math.round(sumAges / memberAges.length);
			let tenPercent = 0.10 * averageAge;
			let maxAge = Math.round(averageAge + tenPercent);
			let minAge = Math.round(averageAge - tenPercent);

			if (age < minAge || age > maxAge) {
				return res.status(400).json({
					message: "l'age n'est pas dans la moyenne."
				});
			}
		}
	  const member = await Member.create({
		firstName,
		lastName,
		dateOfBirth,
		gender,
		phoneNumber,
		country,
		registrationDate,
		status
	  });
  
	  return res.status(201).json({
		message: 'Member created successfully',
		member
	  });
	} catch (error) {
	  console.error('Error creating member:', error);
	  return res.status(500).json({
		message: 'Failed to create member'
	  });
	}
});

router.post('/import', async (req, res) => {
	try {
		let memberListFile = req.body
		const registrationDate = new Date();
		const status = "valide"
		for (const member of memberListFile) {
            await Member.create({
                firstName: member.firstName,
                lastName: member.lastName,
                dateOfBirth: member.dateOfBirth,
                gender: member.gender,
                phoneNumber: member.phoneNumber,
                country: member.country,
				registrationDate,
				status
            });
            console.log('Member added:', member.firstName, member.lastName);
        }
	}catch {
		console.error('Error creating members:', error);
		return res.status(500).json({
		  message: 'Failed to create members'
		});
	}
})


module.exports = router;