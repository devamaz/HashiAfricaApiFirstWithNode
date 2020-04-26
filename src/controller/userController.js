import userModel from '../model/userModel';
import { asyncHandler } from '../utils/helper'

// @desc      create user
// @route     POST /api/v1/user
// @access    Public
export const createUser = asyncHandler(async (req, res) => {

    const newUser = await userModel.create({ ...req.body });

    return res.status(201).json({
      message: 'Created  successfully',
      data: newUser,
    });
  });

// @desc      Get Single User
// @route     GET /api/v1/user/:id
// @access    Public
export const getUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ message: 'user not found' });
  }

  res.status(200).json({
    message: 'success',
    data: user,
  });
});


// @desc      User Update
// @route     PUT /api/v1/user/:id
// @access    Private
export const updateUser = asyncHandler(async (req, res) => {
  let user = await userModel.findById(req.params.id);

  if (!user) {
    return res.status(400).json({ message: 'user not found' });
  }

  user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete User
// @route     PUT /api/v1/user/:id
// @access    Private
export const deleteUser = asyncHandler(async (req, res) => {
  let user = await userModel.findById(req.params.id);

  if (!user) {
    return res.status(400).json({ message: 'user not found' });
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
