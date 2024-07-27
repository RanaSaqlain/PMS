<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
  
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = request()->route('user');
        return [
            "name" => "required|string|max:200",
            "email" => "required|email|unique:users,email,$user->id,id",
            "password" => ["nullable", "confirmed", Password::min(8)->letters()->symbols()],
        ];
    }
}
