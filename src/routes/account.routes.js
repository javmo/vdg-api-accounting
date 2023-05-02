const { Router } = require('express');
const  router = Router();



const { getAccount, addAssetAccount, addLiabilityAccount, addResultAccount, getAllAccountDetails } = require('../controllers/account.controllers');

//router.get('/balance/:address', getBalance);
//router.get('/:id', getAccount);
router.get('/', getAllAccountDetails);
router.get("/:address",getAccount);
router.post("/asset", addAssetAccount);
router.post("/liability", addLiabilityAccount);
router.post("/result", addResultAccount);



module.exports = router;