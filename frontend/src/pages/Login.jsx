import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../features/apis/authAPI";
import {toast} from 'sonner'
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [signupValues, setSignupValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const handleSignupFieldsChange = (e) => {
    setSignupValues({
      ...signupValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleLoginFieldsChange = (e) => {
    setLoginValues({
      ...loginValues,
      [e.target.name]: e.target.value,
    });
  };
  const signup = async () => {
    try {
      await registerUser(signupValues).unwrap();
      toast.success("signed up")
      
    } catch (error) {
      toast.error("signup failed")
    }
  };
  const login = async () => {
    try {
    await loginUser(loginValues).unwrap();
    toast.success('logged in');
  } catch (error) {
    toast.error('login failed');
  }
  };
  // useEffect(() => {
  //   if(registerError){
  //     toast.error('signup failed')
  //   }
  //   if(registerIsSuccess){
  //     toast.success('signup success')
  //   }
  // }, [registerIsSuccess , registerError]);
  // useEffect(() => {
  //   if(loginError){
  //     toast.error('login failed')
  //   }
  //   if(loginIsSuccess){
  //     toast.success('logged in')
  //     console.log('user is logged in rr');
  //     navigate('/')
  //   }
  // }, [loginIsSuccess , loginError]);

  //! useEffect will not run after successful login because Queryfullfilled will update the global auth state and protected route's navigate  will unmount the compoente before useeffect run and redirect us to home page.
  //! if we use toast in function:>>in callstack first toast will run then protected routes navigate will run.
  return (
    <div className="flex justify-center mt-20">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>please signup.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="username"
                  value={signupValues.username}
                  onChange={handleSignupFieldsChange}
                  placeholder="eg. ravi"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupValues.email}
                  onChange={handleSignupFieldsChange}
                  id="email"
                  placeholder="eg. ravi@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  id="username"
                  name="password"
                  value={signupValues.password}
                  onChange={handleSignupFieldsChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={signup}>
                {registerIsLoading ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>please login</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={loginValues.email}
                  onChange={handleLoginFieldsChange}
                  placeholder="eg. ravi@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={loginValues.password}
                  onChange={handleLoginFieldsChange}
                  type="password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={login}>
                {loginIsLoading ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
