import address from '../models/address';
import Address from '../models/address';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

/**
 * @ADD_ADDRESS
 * @request_type POST
 * @route http://localhost:4000/api/address/add
 * @description Controller that allows user to add delivery address
 * @parameters country, recipient, phoneNo, pincode, houseNo, locality, landmark, city, state, addressType, setDefault
 * @returns Address object
 */

export const addAddress = asyncHandler(async (req, res) => {
  const {
    country,
    recipient,
    phoneNo,
    pincode,
    houseNo,
    locality,
    landmark,
    city,
    state,
    addressType,
    setDefault,
  } = req.body;

  if (
    !(
      country &&
      recipient &&
      phoneNo &&
      pincode &&
      houseNo &&
      locality &&
      city &&
      state &&
      addressType
    )
  ) {
    throw new CustomError('Please enter all the details', 401);
  }

  const address = await Address.create({
    country,
    recipient,
    phoneNo,
    pincode,
    houseNo,
    locality,
    landmark,
    city,
    state,
    addressType,
    setDefault,
    userId: res.user._id,
  });

  res.status(201).json({
    success: true,
    message: 'Address successfully added',
    address,
  });
});

/**
 * @UPDATE_ADDRESS
 * @request_type PUT
 * @route http://localhost:4000/api/address/update/:addressId
 * @description Controller that allows user to update delivery address
 * @parameters country, recipient, phoneNo, pincode, houseNo, locality, landmark, city, state, addressType, setDefault, addressId
 * @returns Address object
 */

export const updateAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const {
    country,
    recipient,
    phoneNo,
    pincode,
    houseNo,
    locality,
    landmark,
    city,
    state,
    addressType,
    setDefault,
  } = req.body;

  if (
    !(
      country &&
      recipient &&
      phoneNo &&
      pincode &&
      houseNo &&
      locality &&
      city &&
      state &&
      addressType
    )
  ) {
    throw new CustomError('Please enter all the details', 401);
  }

  const address = await Address.findOneAndUpdate(
    { _id: addressId },
    {
      country,
      recipient,
      phoneNo,
      pincode,
      houseNo,
      locality,
      landmark,
      city,
      state,
      addressType,
      setDefault,
      userId: res.user._id,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    success: true,
    meassge: 'Address updated successfully',
    address,
  });
});

/**
 * @DELETE_ADDRESS
 * @request_type DELETE
 * @route http://localhost:4000/api/address/delete/:addressId
 * @description Controller that allows user to delete his address
 * @parameters addressId
 * @returns Response object
 */

export const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const address = await Address.findByIdAndDelete(addressId);

  if (!address) {
    throw new CustomError('Address not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Address successfully deleted',
  });
});

/**
 * @GET_ADDRESS
 * @request_type GET
 * @route http://localhost:4000/api/address/:addressId
 * @description Controller that allows user to fetch address
 * @parameters addressId
 * @returns Address object
 */

export const getAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const address = await Address.findById(addressId);

  if (!address) {
    throw new CustomError('Address not found', 401);
  }

  res.status(201).json({
    success: true,
    message: 'Address successfully fetched',
    address,
  });
});

/**
 * @GET_ALL_ADDRESSES
 * @request_type GET
 * @route http://localhost:4000/api/addresses
 * @description Controller that allows user to fetch all his addresses
 * @parameters none
 * @returns Array of address objects
 */

export const getAllAddresses = asyncHandler(async (_req, res) => {
  const addresses = await Address.find({ userId: res.user._id });

  if (addresses.length === 0) {
    throw new CustomError('No address found', 401);
  }

  res.status(201).json({
    success: true,
    meassge: 'Addresses successfully fetched',
    addresses,
  });
});

/**
 * @SET_DEFAULT_ADDRESS
 * @request_type PUT
 * @route http://localhost:4000/api/address/default/:addressId
 * @description Controller that allows user to set default address
 * @parameters addressId
 * @returns Address object
 */

export const setDefaultAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.body;

  let address = await Address.findById(addressId);

  if (!address) {
    throw new CustomError('Address not found', 401);
  }

  await Address.findOneAndUpdate(
    { userId: res.user._id, setDefault: true },
    { setDefault: false },
    { runValidators: true }
  );

  address.setDefault = true;
  address = await address.save();

  res.status(201).json({
    success: true,
    message: 'This address is now your default address',
    address,
  });
});
