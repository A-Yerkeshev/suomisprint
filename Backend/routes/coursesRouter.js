const express = require('express');
const coursesController = require('../controllers/coursesController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         provider_id:
 *           type: string
 *         description:
 *           type: string
 *         short_description:
 *           type: string
 *         image_url:
 *           type: string
 *         price:
 *           type: number
 *         max_students:
 *           type: number
 *         enrolled:
 *           type: array
 *         start_date:
 *           type: number
 *         end_date:
 *           type: number
 *         start_time:
 *           type: number
 *         end_time:
 *           type: number
 *         level:
 *           type: string
 *       required:
 *         - title
 *       example:
 *         title: Finnish for beginners
 *         provider_id: 65243ffae2f98edeecb37a60
 *         description: Finnish language lessons for people, who only start to explore Finnish language.
 *         short_description: Start your Finnish language journey!
 *         level: A0-A2
 *         image_url: ../img/a-woman-in-helsinki.png
 *         price: 20
 *         max_students: 35
 *         enrolled: [6515850e01b5bdc4ea73a4bb, 65167097605470e10a60a09b]
 *         start_date: 1696938595177
 *         end_date: 1696940595177
 *         start_time: 11.30
 *         end_time: 13.00
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get a list of all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Successful response with a list of courses
 *       500:
 *         description: Internal Server Error
 */
router.get('/courses/', coursesController.list);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a single course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with course details
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/courses/:id', coursesController.get);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'  # Reference to the Course schema
 *     responses:
 *       201:
 *         description: Successful response with the created course
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/courses/', protect, coursesController.create);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the deleted course
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/courses/:id', protect, coursesController.delete);

/**
 * @swagger
 * /api/courses/{id}:
 *   patch:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'  # Reference to the Course schema
 *     responses:
 *       200:
 *         description: Successful response with the updated course
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
router.patch('/courses/:id', protect, coursesController.update);

/**
 * @swagger
 * /api/courses/enroll/{id}:
 *   post:
 *     summary: Enroll in a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully enrolled
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/courses/enroll/:id', protect, coursesController.enroll);

/**
 * @swagger
 * /api/courses/enroll/{id}:
 *   get:
 *     summary: Check if a user is enrolled in a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with enrollment status
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/courses/enroll/:id', protect, coursesController.isEnrolled);

/**
 * @swagger
 * /api/courses/enroll/{id}:
 *   delete:
 *     summary: Cancel enrollment in a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully canceled enrollment
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/courses/enroll/:id', protect, coursesController.cancelEnrollment);

/**
 * @swagger
 * /api/courses/mycourses:
 *   get:
 *     summary: Get courses associated with the authenticated user
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with user's courses
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/mycourses', protect, coursesController.myCourses);

module.exports = router