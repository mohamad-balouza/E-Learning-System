const Class = require("../models/classModel");
const UserHasClass = require("../models/userHasClassModel");

exports.getAllClasses = async (req, res) => {

    const classes = await Class.find();
    res.json(classes);
    
}

exports.addClass = async (req, res) => {
    const { class_name, class_description } = req.body;

    const new_class = await Class.create({ class_name, class_description });

    res.json(new_class);
}

exports.joinClass = async (req, res) => {
    const { class_id } = req.body;
    const class_student = req.user.id;

    const student_that_joined = await UserHasClass.create({ class_id, class_student });

    res.json(student_that_joined);
}

exports.getAllEnrolledStudents = async (req, res) => {
    
    const students_that_joined = await UserHasClass.find().populate("class_id").populate("class_student", "-password");

    res.json(students_that_joined);
}

exports.checkIfEnrolled = async (req, res) => {
    const { class_id } = req.body;
    const class_student = req.user.id;

    const student_enrolled = await UserHasClass.find({ class_id, class_student});

    res.json(student_enrolled);
}