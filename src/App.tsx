import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import './App.css'

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
})

type FormFields = z.infer<typeof schema>

// type FormFields = {
// 	email: string
// 	password: string
// }

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			await new Promise((res) => setTimeout(res, 1000))
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
			<h1 className='text-5xl'>React Hook Form</h1>
			<div className='flex flex-col gap-1'>
				<input
					className='py-2 px-4 text-xl rounded-md'
					type='text'
					placeholder='Email'
					{...register('email')}
				/>
				{errors.email && (
					<span className='text-red-500 text-left'>{errors.email.message}</span>
				)}
			</div>
			<div className='flex flex-col gap-1'>
				<input
					className='py-2 px-4 text-xl rounded-md'
					type='password'
					placeholder='Password'
					{...register('password')}
				/>
				{errors.password && (
					<span className='text-red-500 text-left'>
						{errors.password.message}
					</span>
				)}
			</div>
			<button
				className='text-xl rounded-md'
				type='submit'
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</button>
		</form>
	)
}

export default App
