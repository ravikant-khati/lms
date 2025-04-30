import { Button } from "@/components/ui/button";
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
import { useState } from "react";

export function Login() {
  const [signupValues, setSignupValues] = useState({
    username:"",
    email:'',
    password:''
  });
  const [loginValues , setLoginValues] = useState({
    email:"",
    password:""
  })
  const handleSignupFieldsChange=(e)=>{
    setSignupValues({
      ...signupValues , [e.target.name]:e.target.value
    })
    console.log(e.target.value);
  }
  const handleLoginFieldsChange=(e)=>{
    setLoginValues({
      ...loginValues , [e.target.name]:e.target.value
    })
  }
  const signup = ()=>{
    console.log(signupValues);
  }
  const login = ()=>{
    console.log(loginValues);
  }
  return (
    <div className="flex justify-center">
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
                  name='email'
                  value={signupValues.email}
                  onChange={handleSignupFieldsChange}
                  id="email"
                  placeholder="eg. ravi@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input type="password" id="username" name='password' value={signupValues.password} onChange={handleSignupFieldsChange} required />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={signup}>Signup</Button>
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
                <Input id="password"
                name="password"
                value={loginValues.password}
                onChange={handleLoginFieldsChange}
                type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={login}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
