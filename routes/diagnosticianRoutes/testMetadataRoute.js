const express = require('express');
const checkCookie = require('../../authentication/cookie_checker');
require('dotenv').config();
const {testMetadataController} = require('../../controllers/diagnostician_page_controllers/testMetadataController'); // Import the testMetadataController function

const router = express.Router();
const ensureAuthenticated = require('../../authentication/ensure-auth');
router.post('/api/v0/get_test_metadata',ensureAuthenticated, async (req, res) => { 
    // console.log(req.body);
    const pseudo_view = await testMetadataController(req);
    if(pseudo_view) {
        console.log(pseudo_view);
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(401).json({error : 'Invalid Login'});
    }
});

module.exports = router;