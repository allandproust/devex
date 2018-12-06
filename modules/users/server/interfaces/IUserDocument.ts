import { Document } from 'mongoose';
import ICapabilityDocument from '../../../capabilities/server/interfaces/ICapabilityDocument';
import ICapabilitySkillDocument from '../../../capabilities/server/interfaces/ICapabilitySkillDocument';

export default interface IUserDocument extends Document {
	firstName: string;
	lastName: string;
	displayName: string;
	email: string;
	username: string;
	orgsAdmin: [object];
	orgsMember: [object];
	orgsPending: [object];
	password: string;
	salt: string;
	profileImageURL: string;
	provider: string;
	government: string;
	isDisplayEmail: boolean;
	notifyOpportunities: boolean;
	subscribeOpportunitiesId: string;
	convertedNotifications: boolean;
	notifyEvents: boolean;
	notifyBlogs: boolean;
	userTitle: string;
	providerData: object;
	roles: string[];
	updated: Date;
	created: Date;
	resetPasswordToken: string;
	resetPasswordExpires: Date;
	isDeveloper: boolean;
	paymentMethod: string;
	businessName: string;
	businessAddress: string;
	businessAddress2: string;
	businessCity: string;
	businessProvince: string;
	businessCode: string;
	businessContactName: string;
	businessContactEmail: string;
	businessContactPhone: string;
	address: string;
	phone: string;
	notifications: object;
	location: string;
	description: string;
	website: string;
	skills: [string];
	skillsData: object;
	badges: [string];
	endorsements: [object];
	github: string;
	stackOverflow: string;
	stackExchange: string;
	linkedIn: string;
	isPublicProfile: boolean;
	isAutoAdd: boolean;
	capabilities: ICapabilityDocument[];
	capabilitySkills: ICapabilitySkillDocument[];
	capabilityDetails: [object];
}
