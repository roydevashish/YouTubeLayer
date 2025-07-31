import DBConnect from "@/lib/DBConnect";
import EditorModel from "@/models/Editor.model";
import ProjectModel from "@/models/Project.model";
import UserModel from "@/models/User.model";
import { Types } from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const token = await getToken({ req: request });

	if (!token) {
		return Response.json({
			sucess: false,
			message: "Unauthorized: You need to login."
		}, { status: 401 });
	}

	const role = token.role;
	const userId = token.username;
	const url = new URL(request.url);
	const pathnameParts = url.pathname.split("/");
	const projectId = pathnameParts[pathnameParts.length - 1];

	await DBConnect();

	try {
		const user = await UserModel.findOne({ _id: userId });
		if (!user) {
			return Response.json({
				success: false,
				message: "Unauthorized: User doesn't exist."
			}, { status: 401 });
		}

		interface projectDetailInterface {
			_id: Types.ObjectId,
			title: string,
			description: string,
			userId: string
		}

		let projectDetail: projectDetailInterface | null;

		switch (role) {
			case "owner": {
				projectDetail = await ProjectModel.findOne({ _id: projectId, userId });
				if (!projectDetail) {
					return Response.json({
						success: false,
						message: "Unauthorized: You don't own this project."
					}, { status: 401 });
				}
				break;
			}

			case "editor": {
				const isAssigned = await EditorModel.findOne({ projectId, editorId: userId });
				if (!isAssigned) {
					return Response.json({
						success: false,
						message: "Unauthorized: You are not assigned to this project."
					}, { status: 401 });
				}

				projectDetail = await ProjectModel.findOne({ _id: projectId });
				break;
			}
			default: {
				return Response.json({
					sucess: false,
					message: "Unauthorized: Unable to fetch project details."
				}, { status: 401 });
			}
		}

		return Response.json({
			success: true,
			message: "Project details fetched successfully.",
			data: projectDetail
		}, { status: 200 });
	} catch (error) {
		console.log("Error: Unable to fetch project details.");
		console.log(error);
		return Response.json({
			success: false,
			message: "Unable to fetch project details."
		}, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	const token = await getToken({ req: request });

	if (!token) {
		return Response.json({
			sucess: false,
			message: "Unauthorized: You need to login."
		}, { status: 401 });
	}

	const role = token.role;
	const userId = token.username;
	const url = new URL(request.url);
	const pathnameParts = url.pathname.split("/");
	const projectId = pathnameParts[pathnameParts.length - 1];

	await DBConnect();

	try {
		const user = await UserModel.findOne({ _id: userId });
		if (!user) {
			return Response.json({
				success: false,
				message: "Unauthorized: User doesn't exist."
			}, { status: 401 });
		}

		const project = await ProjectModel.findOne({ _id: projectId });
		if (!project) {
			return Response.json({
				success: false,
				message: "Project does not exits."
			}, { status: 404 });
		}

		switch (role) {
			case "owner": {
				const isOwner = ProjectModel.findOne({ _id: projectId, userId });
				if (!isOwner) {
					return Response.json({
						success: false,
						message: "Unauthorized: You don't own this project."
					}, { status: 401 });
				}

				await isOwner.deleteOne()

				return Response.json({
					success: true,
					message: "Project successfully deleted."
				}, { status: 201 });
			}

			default: {
				return Response.json({
					sucess: false,
					message: "Unauthorized: You are not authorized to delete project."
				}, { status: 401 });
			}
		}
	} catch (error) {
		console.log("Error: Unable to delete the project.");
		console.log(error);
		return Response.json({
			success: false,
			message: "Unable to delete the project."
		}, { status: 500 });
	}
}

export async function PATCH(request: NextRequest) {
	const token = await getToken({ req: request });

	if (!token) {
		return Response.json({
			sucess: false,
			message: "Unauthorized: You need to login."
		}, { status: 401 });
	}

	const role = token.role;
	const userId = token.username;
	const url = new URL(request.url);
	const pathnameParts = url.pathname.split("/");
	const projectId = pathnameParts[pathnameParts.length - 1];

	await DBConnect();

	try {
		const user = await UserModel.findOne({ _id: userId });
		if (!user) {
			return Response.json({
				success: false,
				message: "Unauthorized: User doesn't exist."
			}, { status: 401 });
		}

		const project = await ProjectModel.findOne({ _id: projectId });
		if (!project) {
			return Response.json({
				success: false,
				message: "Project does not exits."
			}, { status: 404 });
		}

		switch (role) {
			case "owner": {
				const project = ProjectModel.findOne({ _id: projectId, userId });
				if (!project) {
					return Response.json({
						success: false,
						message: "Unauthorized: You don't own this project."
					}, { status: 401 });
				}

				const {title, description} = await request.json();

				await project.updateOne({ _id: projectId, userId }, {$set : {title, description}});

				return Response.json({
					success: true,
					message: "Project successfully updated."
				}, { status: 201 });
			}

			default: {
				return Response.json({
					sucess: false,
					message: "Unauthorized: You are not authorized to update the project."
				}, { status: 401 });
			}
		}
	} catch (error) {
		console.log("Error: Unable to update the project.");
		console.log(error);
		return Response.json({
			success: false,
			message: "Unable to update the project."
		}, { status: 500 });
	}
}