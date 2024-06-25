import { GoalSchema, type Goal } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate, withFiles } from 'sveltekit-superforms';

export const load: PageServerLoad = async ({ locals }) => {
	const goals: Goal[] = await locals.pb.collection('goals').getFullList({});
	return { goals };
};

export const actions: Actions = {
	createOrUpdateGoal: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(GoalSchema));

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		try {
			let goal: Goal;

			if (form.data.id) {
				goal = await locals.pb.collection('goals').update(form.data.id, form.data);
			} else {
				goal = await locals.pb
					.collection('goals')
					.create({ ...form.data, user_id: locals.user?.id });
			}

			return withFiles({ form, goal });
		} catch (err) {
			console.log('Error: ', err);
		}
	}
};
